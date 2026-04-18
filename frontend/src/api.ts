import type { SearchRequest } from "./types";

export async function startSearch(request: SearchRequest): Promise<{ search_id: string; stream_url: string }> {
  const resp = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!resp.ok) throw new Error("Failed to start search");
  return resp.json();
}

export async function fetchReport(searchId: string): Promise<{ report_markdown: string; prospects_analyzed: number }> {
  const resp = await fetch(`/api/search/${searchId}/report`);
  if (!resp.ok) throw new Error("Failed to fetch report");
  return resp.json();
}
