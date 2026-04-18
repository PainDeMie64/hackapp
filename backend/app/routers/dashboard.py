from fastapi import APIRouter

from app.store import store

router = APIRouter(prefix="/api")

CONFIDENCE_SCORE = {"high": 90, "medium": 65, "low": 35}


@router.get("/dashboard")
async def get_dashboard():
    completed = [
        entry["session"]
        for entry in store.values()
        if entry["session"].status == "completed"
    ]

    total_prospects = sum(len(s.prospects) for s in completed)
    total_searches = len(completed)

    all_prospects = [p for s in completed for p in s.prospects]

    band_counts = {"high": 0, "medium": 0, "low": 0}
    for p in all_prospects:
        band_counts[p.confidence] = band_counts.get(p.confidence, 0) + 1

    scores = [CONFIDENCE_SCORE.get(p.confidence, 50) for p in all_prospects]
    avg_score = round(sum(scores) / len(scores)) if scores else 0
    max_score = max(scores) if scores else 0

    top_prospects = sorted(all_prospects, key=lambda p: CONFIDENCE_SCORE.get(p.confidence, 50), reverse=True)[:5]

    reports_count = sum(1 for s in completed if s.report)

    return {
        "total_prospects": total_prospects,
        "total_searches": total_searches,
        "reports_count": reports_count,
        "avg_score": avg_score,
        "max_score": max_score,
        "band_counts": band_counts,
        "top_prospects": [
            {"name": p.name, "sector": p.sector, "location": p.location, "confidence": p.confidence, "score": CONFIDENCE_SCORE.get(p.confidence, 50)}
            for p in top_prospects
        ],
    }
