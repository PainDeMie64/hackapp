import type { SearchRequest, Prospect } from "./types";

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
  prospects: Prospect[];
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

export interface DashboardData {
  total_prospects: number;
  total_searches: number;
  reports_count: number;
  avg_score: number;
  max_score: number;
  band_counts: { high: number; medium: number; low: number };
  top_prospects: { name: string; sector: string; location: string; confidence: string; score: number }[];
}

export async function fetchDashboard(): Promise<DashboardData> {
  const resp = await fetch("/api/dashboard");
  if (!resp.ok) throw new Error("Failed to fetch dashboard");
  return resp.json();
}

export function getExportUrl(searchId: string, format: "csv" | "xlsx"): string {
  return `/api/search/${searchId}/export/${format}`;
}
