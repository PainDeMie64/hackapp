import asyncio
import logging

from anthropic import AsyncAnthropicBedrock, RateLimitError

from app.config import settings
from app.models import SearchSession

logger = logging.getLogger(__name__)

MAX_RETRIES = 5


def _get_client() -> AsyncAnthropicBedrock:
    return AsyncAnthropicBedrock(
        aws_access_key=settings.aws_access_key_id,
        aws_secret_key=settings.aws_secret_access_key,
        aws_session_token=settings.aws_session_token,
        aws_region=settings.aws_default_region,
    )


async def generate_news_report(session: SearchSession) -> str:
    prospects_text = "\n".join(
        f"- **{p.name}** ({p.location}): {p.news_summary or 'Pas d actualités trouvées'}"
        f" | CA: {p.revenue or 'N/A'} | Effectifs: {p.headcount or 'N/A'}"
        f" | Croissance: {p.growth_potential or 'N/A'}"
        for p in session.prospects
    )

    client = _get_client()

    for attempt in range(MAX_RETRIES):
        try:
            response = await client.messages.create(
                model=settings.claude_model,
                max_tokens=4096,
                messages=[
                    {
                        "role": "user",
                        "content": f"""Génère un rapport d'intelligence commerciale pour ALTEN concernant les prospects
suivants, trouvés dans le secteur "{session.request.sector}" en "{session.request.location}".

Prospects et leurs données :
{prospects_text}

Structure le rapport ainsi :
1. **Synthèse exécutive** (3-4 phrases sur le marché analysé)
2. **Tendances clés du marché** (quels patterns observes-tu parmi ces entreprises)
3. **Analyse par entreprise** (1 paragraphe chacune, focus sur les implications pour ALTEN)
4. **Cibles prioritaires recommandées** (top 3 entreprises et pourquoi ALTEN devrait les contacter)
5. **Prochaines étapes recommandées** (actions concrètes pour l'équipe commerciale)

Écris en français, dans un style professionnel et concis. Utilise le format Markdown.""",
                    }
                ],
            )
            return response.content[0].text
        except RateLimitError:
            wait = 2 ** attempt + 1
            logger.warning(f"Rate limited on report generation, retrying in {wait}s")
            await asyncio.sleep(wait)

    return "# Erreur\n\nImpossible de générer le rapport (limite de requêtes atteinte). Réessayez dans quelques instants."
