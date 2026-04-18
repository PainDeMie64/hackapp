from fastapi import APIRouter, HTTPException

from app.store import get_session
from app.services.news_service import generate_news_report

router = APIRouter(prefix="/api/search")


@router.get("/{search_id}/report")
async def get_report(search_id: str):
    entry = get_session(search_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Search not found")
    session = entry["session"]
    if not session.report:
        session.report = await generate_news_report(session)
    return {
        "report_markdown": session.report,
        "prospects_analyzed": len(session.prospects),
    }
