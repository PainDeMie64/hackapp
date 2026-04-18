from ddgs import DDGS


async def web_search(query: str, search_type: str = "web", count: int = 10) -> str:
    try:
        ddgs = DDGS()

        if search_type == "news":
            items = list(ddgs.news(query, max_results=count))
            results = []
            for i, item in enumerate(items, 1):
                title = item.get("title", "")
                url = item.get("url", "")
                body = item.get("body", "")
                date = item.get("date", "")
                line = f"{i}. {title}\n   URL: {url}\n   {body}"
                if date:
                    line += f"\n   Date: {date}"
                results.append(line)
        else:
            items = list(ddgs.text(query, max_results=count))
            results = []
            for i, item in enumerate(items, 1):
                title = item.get("title", "")
                url = item.get("href", "")
                body = item.get("body", "")
                results.append(f"{i}. {title}\n   URL: {url}\n   {body}")

        return "\n\n".join(results) if results else "No results found for this query. Try a different search query."
    except Exception as e:
        return f"Search failed: {e}. Try a different search query."
