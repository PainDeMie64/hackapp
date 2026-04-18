import asyncio
import logging

from anthropic import AsyncAnthropicBedrock, RateLimitError

from app.config import settings
from app.models import SearchSession, Prospect
from app.agent.prompts import SYSTEM_PROMPT, build_user_prompt
from app.agent.tools import TOOLS
from app.services.search_service import web_search
from app.services.sheets_service import create_search_sheet, append_prospect

logger = logging.getLogger(__name__)

MAX_TOOL_CALLS = 50
MAX_RETRIES = 5


def get_client() -> AsyncAnthropicBedrock:
    return AsyncAnthropicBedrock(
        aws_access_key=settings.aws_access_key_id,
        aws_secret_key=settings.aws_secret_access_key,
        aws_session_token=settings.aws_session_token,
        aws_region=settings.aws_default_region,
    )


async def emit(queue: asyncio.Queue, session: SearchSession, event_type: str, data: dict):
    event = {"event": event_type, "data": data}
    session.events.append(event)
    await queue.put(event)


async def call_claude_with_retry(client, queue, session, **kwargs):
    for attempt in range(MAX_RETRIES):
        try:
            return await client.messages.create(**kwargs)
        except RateLimitError:
            wait = 2 ** attempt + 1
            logger.warning(f"Rate limited, retrying in {wait}s (attempt {attempt + 1}/{MAX_RETRIES})")
            await emit(queue, session, "status", {
                "message": f"Limite de requêtes atteinte, nouvelle tentative dans {wait}s...",
                "prospects_found": len(session.prospects),
                "total_requested": session.request.num_prospects,
            })
            await asyncio.sleep(wait)
    raise RateLimitError("Rate limit exceeded after all retries")


async def execute_tool(
    tool_name: str,
    tool_input: dict,
    session: SearchSession,
    queue: asyncio.Queue,
) -> str:
    if tool_name == "web_search":
        query = tool_input.get("query", "")
        search_type = tool_input.get("search_type", "web")
        return await web_search(query, search_type)

    elif tool_name == "save_prospect":
        prospect = Prospect(**tool_input)
        session.prospects.append(prospect)

        await emit(queue, session, "prospect", prospect.model_dump())

        if session.sheet_url:
            try:
                await append_prospect(session.sheet_url, prospect)
                await emit(queue, session, "sheet_update", {
                    "url": session.sheet_url,
                    "row_count": len(session.prospects),
                })
            except Exception as e:
                logger.warning(f"Failed to write to Google Sheet: {e}")

        return f"Prospect '{prospect.name}' saved successfully. Total: {len(session.prospects)}/{session.request.num_prospects}"

    elif tool_name == "update_status":
        message = tool_input.get("message", "")
        prospects_found = tool_input.get("prospects_found", len(session.prospects))
        await emit(queue, session, "status", {
            "message": message,
            "prospects_found": prospects_found,
            "total_requested": session.request.num_prospects,
        })
        return "Status updated."

    return f"Unknown tool: {tool_name}"


async def run_search(session: SearchSession, queue: asyncio.Queue):
    try:
        session.status = "running"
        await emit(queue, session, "status", {
            "message": "Initialisation de l'agent de prospection...",
            "prospects_found": 0,
            "total_requested": session.request.num_prospects,
        })

        try:
            sheet_url = await create_search_sheet(
                session.search_id,
                session.request.sector,
                session.request.location,
            )
            if sheet_url:
                session.sheet_url = sheet_url
                await emit(queue, session, "sheet_update", {
                    "url": sheet_url,
                    "row_count": 0,
                })
        except Exception as e:
            logger.warning(f"Could not create Google Sheet: {e}")

        client = get_client()

        user_prompt = build_user_prompt(
            sector=session.request.sector,
            location=session.request.location,
            num_prospects=session.request.num_prospects,
            conditions=session.request.conditions,
            metrics=session.request.metrics,
        )
        messages = [{"role": "user", "content": user_prompt}]

        tool_call_count = 0

        while tool_call_count < MAX_TOOL_CALLS:
            response = await call_claude_with_retry(
                client, queue, session,
                model=settings.claude_model,
                max_tokens=2048,
                system=SYSTEM_PROMPT,
                tools=TOOLS,
                messages=messages,
            )

            if response.stop_reason == "end_turn":
                break

            tool_use_blocks = [b for b in response.content if b.type == "tool_use"]
            if not tool_use_blocks:
                break

            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            for block in tool_use_blocks:
                tool_call_count += 1
                result = await execute_tool(
                    block.name, block.input, session, queue
                )
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result,
                })

            messages.append({"role": "user", "content": tool_results})

        session.status = "completed"
        await emit(queue, session, "complete", {
            "total_prospects": len(session.prospects),
            "sheet_url": session.sheet_url,
        })

    except Exception as e:
        logger.exception("Agent error")
        session.status = "error"
        await emit(queue, session, "error", {"message": str(e)})
