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

export interface SearchHistoryItem {
  search_id: string;
  sector: string;
  location: string;
  num_prospects: number;
  status: string;
  best_confidence: string;
}

export async function fetchSearchHistory(): Promise<SearchHistoryItem[]> {
  const resp = await fetch("/api/search");
  if (!resp.ok) throw new Error("Failed to fetch history");
  return resp.json();
}

export async function fetchSearchDetail(searchId: string): Promise<{
  search_id: string;
  status: string;
  prospects: import("./types").Prospect[];
  sheet_url: string | null;
  report: string | null;
}> {
  const resp = await fetch(`/api/search/${searchId}`);
  if (!resp.ok) throw new Error("Failed to fetch search");
  return resp.json();
}

export async function fetchReport(searchId: string): Promise<{ report_markdown: string; prospects_analyzed: number }> {
  const resp = await fetch(`/api/search/${searchId}/report`);
  if (!resp.ok) throw new Error("Failed to fetch report");
  return resp.json();
}
