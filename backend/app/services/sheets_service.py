import logging
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials

from app.config import settings
from app.models import Prospect

logger = logging.getLogger(__name__)

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

HEADERS = [
    "Entreprise",
    "Secteur",
    "Localisation",
    "Site web",
    "Description",
    "Chiffre d'affaires",
    "Effectifs",
    "CA/Employé",
    "Potentiel de croissance",
    "Utilise des prestations intellectuelles",
    "Actualités récentes",
    "Confiance",
]


def _get_client() -> gspread.Client | None:
    creds_path = Path(settings.google_credentials_path)
    if not creds_path.exists():
        logger.warning(f"Google credentials not found at {creds_path}")
        return None
    creds = Credentials.from_service_account_file(str(creds_path), scopes=SCOPES)
    return gspread.authorize(creds)


async def create_search_sheet(search_id: str, sector: str, location: str) -> str:
    gc = _get_client()
    if not gc:
        return ""

    title = f"ALTEN Prospects - {sector} - {location} - {search_id[:8]}"
    spreadsheet = gc.create(title)
    spreadsheet.share("", perm_type="anyone", role="reader")

    worksheet = spreadsheet.sheet1
    worksheet.update([HEADERS], "A1:L1")
    worksheet.format("A1:L1", {
        "backgroundColor": {"red": 0.0, "green": 0.32, "blue": 0.65},
        "textFormat": {
            "bold": True,
            "foregroundColor": {"red": 1.0, "green": 1.0, "blue": 1.0},
        },
    })

    return spreadsheet.url


async def append_prospect(sheet_url: str, prospect: Prospect) -> None:
    if not sheet_url:
        return
    gc = _get_client()
    if not gc:
        return

    spreadsheet = gc.open_by_url(sheet_url)
    worksheet = spreadsheet.sheet1
    worksheet.append_row([
        prospect.name,
        prospect.sector,
        prospect.location,
        prospect.website or "",
        prospect.description or "",
        prospect.revenue or "",
        prospect.headcount or "",
        prospect.revenue_per_fte or "",
        prospect.growth_potential or "",
        prospect.uses_intellectual_services or "",
        prospect.news_summary or "",
        prospect.confidence,
    ])
