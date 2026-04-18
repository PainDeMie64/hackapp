TOOLS = [
    {
        "name": "web_search",
        "description": (
            "Search the web for information about companies, financial data, news, "
            "and any other information needed for prospecting. "
            "Use French-language queries for French companies and locations."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query. Use French for French companies/locations.",
                },
                "search_type": {
                    "type": "string",
                    "enum": ["web", "news"],
                    "description": "Type of search. Use 'news' for recent articles about a company.",
                    "default": "web",
                },
            },
            "required": ["query"],
        },
    },
    {
        "name": "save_prospect",
        "description": (
            "Save a prospect company to the database and Google Sheet. "
            "Call this once you have gathered enough information about a company. "
            "The prospect will immediately appear in the user's interface."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Company name"},
                "sector": {"type": "string", "description": "Industry sector"},
                "location": {"type": "string", "description": "City or region"},
                "website": {"type": "string", "description": "Company website URL"},
                "description": {"type": "string", "description": "Brief company description (1-2 sentences)"},
                "revenue": {"type": "string", "description": "Revenue / Chiffre d'affaires (e.g. '150M EUR')"},
                "headcount": {"type": "string", "description": "Number of employees (e.g. '2500 employés')"},
                "revenue_per_fte": {"type": "string", "description": "Revenue per employee if calculable"},
                "growth_potential": {
                    "type": "string",
                    "description": "Growth potential assessment: 'Fort', 'Moyen', or 'Faible' with brief justification",
                },
                "uses_intellectual_services": {
                    "type": "string",
                    "description": "Whether the company is known to use consulting/engineering services",
                },
                "news_summary": {"type": "string", "description": "Summary of recent news (1-2 sentences)"},
                "source_urls": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "URLs of sources used",
                },
                "confidence": {
                    "type": "string",
                    "enum": ["high", "medium", "low"],
                    "description": "Data confidence level",
                },
            },
            "required": ["name", "sector", "location"],
        },
    },
    {
        "name": "update_status",
        "description": (
            "Update the user on what you are currently doing. "
            "Use this to keep the user informed of your progress. "
            "Call this before starting a new phase of work."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "Status message describing current activity",
                },
                "prospects_found": {
                    "type": "integer",
                    "description": "Number of prospects saved so far",
                },
            },
            "required": ["message"],
        },
    },
]
