# HackApp — System Specification

## Overview

Commercial intelligence tool for ALTEN. Ingests a list of company websites, builds a structured database of company profiles, and enriches them with AI-extracted news intelligence on demand.

One user: the company CEO. The goal is to surface actionable prospecting data and news about target companies through a clean web interface.

---

## Architecture

```
[CSV of ~1000 URLs] ──► [Filter pipeline] ──► [Ingest API] ──► [Companies DB]
     (team)                (team)               (us)              (us)
                                                                    │
                                                        CEO clicks "Enrich"
                                                                    │
                                                                    ▼
                                                          [News enrichment]
                                                               (us)
                                                                    │
                                                                    ▼
                                                         [News DB + R2 Reports]
                                                               (us)
                                                                    │
                                                                    ▼
                                                              [Web UI]
                                                               (team)
```

---

## Data Flow

### Phase A — Background ingestion (infrequent, backend-only)

Steps 1–3 run periodically. Not triggered by the user.

| Step | Owner | Description |
|------|-------|-------------|
| 1 | Other team | Populate the `sources` table with ~1000 website URLs (newsletters, government registries, company directories). |
| 2 | **Us** | `POST /api/scrape` scrapes **priority sources** by default (`is_priority = true`). Pass `{ "all": true }` to scrape all active sources, or `{ "source_ids": [...] }` for specific ones. Stores raw content in R2 + metadata in the `scrape_results` table. |
| 3 | **Us** | From the scraped data, upsert rows in the `companies` table. Populate only objective, factual fields. No subjective analysis. No news. |

### Phase B — On-demand news enrichment (user-triggered)

Steps 4–5 run when the CEO clicks "Enrich" in the web app.

| Step | Owner | Description |
|------|-------|-------------|
| 4 | **Us** | For each relevant company: search for recent news via its `domain` and `name` across linked sources, extract structured news entries using an LLM, store results in the `news` table, and write a detailed report to R2. The enrichment is **asynchronous** — the API returns `202 Accepted` immediately and processes in the background via Cloudflare's `ctx.waitUntil()`. The frontend polls `GET /api/companies/{id}` to check `enrichment_status`. |
| 5 | Other team | The web UI reads from `companies` and `news` tables to render dashboards, search results, and company profiles. |

---

## Database Schema

The existing `users` table from the starter template will be dropped. The schema below is the complete production schema.

### `sources`

The original websites/URLs from the CSV. Each source can yield information about multiple companies.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID |
| `url` | text | unique, not null | The source website URL |
| `name` | text | | Human-readable name (e.g., "Societe.com") |
| `type` | text | | `newsletter`, `government`, `directory`, `news`, `company_website`, `other` |
| `is_priority` | integer | default 0 | Priority source used by default in scraping (Pappers, Societe.com, BODACC, INSEE, AMF, FIBEN, DARES) |
| `is_active` | integer | default 1 | Whether the source is currently reachable (0/1) |
| `last_crawled_at` | integer | | Last time we extracted data from this source (Unix timestamp) |
| `created_at` | integer | | Row creation time |
| `updated_at` | integer | | Row update time |

### `companies`

Core company profiles. Only objective, factual data. Updated during Phase A (step 3).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID |
| `name` | text | not null | Company legal name |
| `domain` | text | unique | Primary website domain (e.g., `alten.com`) |
| `description` | text | | Brief description of what the company does |
| `sector` | text | | Industry sector (e.g., `consulting`, `manufacturing`) |
| `subsector` | text | | More specific classification |
| `location_city` | text | | City |
| `location_country` | text | | Country |
| `employee_count` | integer | | Number of employees (FTEs) |
| `revenue_eur` | integer | | Annual revenue in whole euros (e.g., 50000000 for 50M) |
| `revenue_year` | integer | | Year the revenue figure refers to |
| `tech_stack` | text | | JSON array string, e.g. `["Python","React","AWS"]` |
| `uses_consulting_services` | integer | | Whether they use external consulting (0/1) |
| `linkedin_url` | text | | LinkedIn company page URL |
| `siren` | text | | French SIREN number (if applicable) |
| `logo_url` | text | | URL to company logo |
| `status` | text | default `active` | `active`, `inactive`, `acquired`, `unknown` |
| `enrichment_status` | text | default `pending` | `pending`, `in_progress`, `completed`, `failed` |
| `last_enriched_at` | integer | | When enrichment last ran for this company |
| `created_at` | integer | | Row creation time |
| `updated_at` | integer | | Row update time |

**Indexes:** `sector`, `location_country`.

### `news`

AI-extracted news entries. Created during Phase B (step 4) when the user triggers enrichment.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID |
| `company_id` | text | FK → companies.id, not null | Which company this news is about |
| `source_id` | text | FK → sources.id, not null | Which source this news was found on |
| `title` | text | not null | Short headline (1–2 sentences) |
| `summary` | text | | LLM-generated 2–3 sentence summary |
| `category` | text | | `hiring`, `funding`, `partnership`, `acquisition`, `product_launch`, `regulation`, `other` |
| `source_url` | text | not null | Direct link to the original article/page |
| `report_key` | text | | R2 object key for the full report (nullable — set after report generation) |
| `sentiment` | text | | `positive`, `negative`, `neutral` |
| `relevance_score` | integer | | 1–10, how relevant for ALTEN's prospecting |
| `published_at` | integer | | When the news was originally published |
| `extracted_at` | integer | | When we ran the LLM extraction |
| `created_at` | integer | | Row creation time |

**Unique constraint:** `(company_id, source_url)` — prevents duplicate extraction of the same article.

**Indexes:** `published_at`.

---

## R2 Storage

Bucket: `hackapp-storage` (binding: `STORAGE`).

Used to store the full LLM-generated reports for each news item. Key format:

```
reports/{news_id}.md
```

Each report is a ~1 page markdown document with these sections:

```markdown
# {Company Name} — {News Title}

## Company Context
Brief background on the company.

## News Details
What happened, when, and why it matters.

## Relevance to ALTEN
How this news creates an opportunity for ALTEN.

## Recommended Actions
2–3 concrete next steps for the commercial team.
```

---

## API

### Request/Response conventions

- **Content-Type:** `application/json` for all endpoints.
- **Success responses:** `{ data: ... }` with appropriate HTTP status.
- **Error responses:** `{ error: string, code?: string }` with HTTP status:
  - `400` — bad request (missing/invalid fields)
  - `404` — resource not found
  - `409` — conflict (duplicate)
  - `500` — internal error
  - `503` — external service failure (LLM, crawl)

### Endpoints

#### `POST /api/companies/ingest`

Accepts company data from the filtering pipeline (step 2). Upserts by `domain`.

**Request body:**
```json
{
  "companies": [
    {
      "name": "Acme Corp",
      "domain": "acme.com",
      "sector": "manufacturing",
      "location_city": "Nantes",
      "location_country": "France",
      "employee_count": 500,
      "revenue_eur": 50000000,
      "revenue_year": 2025,
      "description": "Industrial equipment manufacturer",
      "tech_stack": ["SAP", "Azure"],
      "siren": "123456789"
    }
  ]
}
```

Required fields: `name`, `domain`. All others optional.

**Response:** `200 OK`
```json
{ "data": { "created": 5, "updated": 3, "total": 8 } }
```

#### `POST /api/companies/{id}/enrich`

Triggers LLM news extraction for one company. Returns immediately.

**Response:** `202 Accepted`
```json
{ "data": { "status": "in_progress" } }
```

The enrichment runs asynchronously via `ctx.waitUntil()`. Poll `GET /api/companies/{id}` and check `enrichment_status` for completion.

#### `POST /api/enrich`

Batch enrichment for multiple companies.

**Request body:**
```json
{
  "company_ids": ["uuid-1", "uuid-2", "uuid-3"]
}
```

**Response:** `202 Accepted`
```json
{ "data": { "queued": 3 } }
```

#### `GET /api/companies`

List companies with optional filters and pagination.

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `sector` | string | Filter by sector (exact match) |
| `country` | string | Filter by `location_country` |
| `status` | string | Filter by status |
| `enrichment_status` | string | Filter by enrichment status |
| `q` | string | Search by name (LIKE match) |
| `limit` | integer | Page size (default 50, max 200) |
| `offset` | integer | Pagination offset (default 0) |
| `sort` | string | Sort field (default `name`). Prefix with `-` for descending, e.g. `-revenue_eur` |

**Response:** `200 OK`
```json
{
  "data": [ { ... company objects ... } ],
  "total": 142,
  "limit": 50,
  "offset": 0
}
```

#### `GET /api/companies/{id}`

Single company profile. Does **not** include news — use `/news` sub-route.

**Response:** `200 OK`
```json
{ "data": { ... company object ... } }
```

#### `GET /api/companies/{id}/news`

News entries for a company, sorted by `published_at` descending.

**Response:** `200 OK`
```json
{ "data": [ { ... news objects without report content ... } ] }
```

#### `GET /api/news/{id}/report`

Fetch the full LLM-generated report from R2.

**Response:** `200 OK` with `Content-Type: text/markdown`
```
# Acme Corp — New Partnership with Siemens
...
```

Returns `404` if no report exists yet.

#### `GET /api/health`

System status check.

**Response:** `200 OK`
```json
{ "status": "ok", "db": "connected", "storage": "connected", "timestamp": "..." }
```

---

## Enrichment Strategy

When enrichment is triggered for a company:

1. Search for recent news using the company's `name` and `domain` across:
   - Linked sources in the `sources` table (matched via known source URLs)
   - General web search (Google Custom Search or similar)
2. For each news article found:
   - Extract title, summary, sentiment, relevance score, category using an LLM
   - Upsert into `news` table (deduplicated by `company_id + source_url`)
3. For each new news entry:
   - Generate a ~1 page markdown report via LLM
   - Upload to R2 at `reports/{news_id}.md`
   - Update `report_key` in the news row
4. Update the company's `enrichment_status` to `completed` and `last_enriched_at` to now.

If enrichment finds no news: set `enrichment_status` to `completed` with an empty news list. The frontend distinguishes "never enriched" (`pending`) from "enriched but nothing found" (`completed` with zero news rows).

If a source is unreachable: skip it and continue with remaining sources. Log the failure but do not fail the entire enrichment.

---

## Constraints

- Single user (no auth for the hackathon)
- D1 is SQLite — no concurrent writes from multiple workers, fine for single-user
- R2 reports are markdown, not PDF
- LLM provider: configurable (OpenAI, Anthropic, AWS Bedrock) — decided at implementation time
- All timestamps stored as Unix epoch integers (D1/SQLite convention with Drizzle)
- Company deduplication by `domain` (unique constraint)
- News deduplication by `(company_id, source_url)` (unique constraint)
- Enrichment is async via `ctx.waitUntil()` — CEO sees immediate response, results appear as they complete

## Out of Scope

- User authentication
- CSV parsing (step 1 — other team)
- URL filtering/validation (step 2 — other team)
- Frontend UI/UX (step 5 — other team)
- Scheduled/cron jobs (manual trigger for the hackathon)
