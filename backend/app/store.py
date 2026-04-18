import asyncio

store: dict[str, dict] = {}


def get_session(search_id: str) -> dict | None:
    return store.get(search_id)


def create_session(search_id: str, session, queue: asyncio.Queue):
    store[search_id] = {"session": session, "queue": queue}
