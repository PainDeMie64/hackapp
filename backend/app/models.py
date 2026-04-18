from pydantic import BaseModel


class SearchRequest(BaseModel):
    sector: str
    location: str
    num_prospects: int = 10
    conditions: str = ""
    metrics: list[str] = []


class Prospect(BaseModel):
    name: str
    sector: str
    location: str
    website: str | None = None
    description: str | None = None
    revenue: str | None = None
    headcount: str | None = None
    revenue_per_fte: str | None = None
    growth_potential: str | None = None
    uses_intellectual_services: str | None = None
    news_summary: str | None = None
    source_urls: list[str] = []
    confidence: str = "medium"


class SearchSession(BaseModel):
    search_id: str
    request: SearchRequest
    status: str = "pending"
    prospects: list[Prospect] = []
    sheet_url: str | None = None
    report: str | None = None
    events: list[dict] = []
