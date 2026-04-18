export interface SearchRequest {
  sector: string;
  location: string;
  num_prospects: number;
  conditions: string;
  metrics: string[];
}

export interface Prospect {
  name: string;
  sector: string;
  location: string;
  website: string | null;
  description: string | null;
  revenue: string | null;
  headcount: string | null;
  revenue_per_fte: string | null;
  growth_potential: string | null;
  uses_intellectual_services: string | null;
  news_summary: string | null;
  source_urls: string[];
  confidence: string;
}

export interface StatusEvent {
  message: string;
  prospects_found: number;
  total_requested: number;
}
