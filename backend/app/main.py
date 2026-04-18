from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import search, report, export, dashboard

app = FastAPI(title="ALTEN Prospecting Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)
app.include_router(report.router)
app.include_router(export.router)
app.include_router(dashboard.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
