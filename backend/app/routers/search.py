import asyncio
import json
import uuid

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.models import SearchRequest, SearchSession
from app.store import store, create_session, get_session
from app.agent.orchestrator import run_search

router = APIRouter(prefix="/api/search")


@router.post("")
async def start_search(request: SearchRequest):
    search_id = str(uuid.uuid4())
    session = SearchSession(search_id=search_id, request=request, status="running")
    queue: asyncio.Queue = asyncio.Queue()
    create_session(search_id, session, queue)
    asyncio.create_task(run_search(session, queue))
    return {
        "search_id": search_id,
        "stream_url": f"/api/search/{search_id}/stream",
    }


@router.get("/{search_id}/stream")
async def stream_search(search_id: str):
    entry = get_session(search_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Search not found")

    session = entry["session"]

    async def event_generator():
        if session.status in ("completed", "error"):
            for past_event in session.events:
                event_type = past_event.get("event", "message")
                data = json.dumps(past_event.get("data", {}), ensure_ascii=False)
                yield f"event: {event_type}\ndata: {data}\n\n"
            return
        queue: asyncio.Queue = entry["queue"]
        while True:
            event = await queue.get()
            event_type = event.get("event", "message")
            data = json.dumps(event.get("data", {}), ensure_ascii=False)
            yield f"event: {event_type}\ndata: {data}\n\n"
            if event_type in ("complete", "error"):
                break

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


@router.get("")
async def list_searches():
    results = []
    for entry in store.values():
        session = entry["session"]
        if session.status in ("completed", "error"):
            best_confidence = "low"
            for p in session.prospects:
                if p.confidence == "high":
                    best_confidence = "high"
                    break
                if p.confidence == "medium":
                    best_confidence = "medium"
            results.append({
                "search_id": session.search_id,
                "sector": session.request.sector,
                "location": session.request.location,
                "num_prospects": len(session.prospects),
                "status": session.status,
                "best_confidence": best_confidence,
            })
    return results


@router.get("/{search_id}")
async def get_search(search_id: str):
    entry = get_session(search_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Search not found")
    session = entry["session"]
    return {
        "search_id": session.search_id,
        "status": session.status,
        "prospects": [p.model_dump() for p in session.prospects],
        "sheet_url": session.sheet_url,
        "report": session.report,
    }
