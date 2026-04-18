# n8n — ALTEN Prospect Agent Workflow

Local n8n workflow for the ALTEN Commercial Intelligence & Prospecting use case.

## Quick Start

```bash
npm run n8n
```

Opens n8n at http://localhost:5679 with the workflow pre-imported.

Login: `admin@hackapp.dev` / `HackApp2026!`

## Team Collaboration

Workflows are stored as JSON files in this directory. The git repo is the source of truth.

**After editing a workflow in the n8n UI:**

```bash
npm run n8n:export    # saves all workflows from n8n → n8n/*.workflow.json
git add n8n/
git commit -m "Update prospect workflow"
git push
```

**After pulling changes from a teammate:**

```bash
git pull
npm run n8n:import    # pushes n8n/*.workflow.json → your running n8n
```

This means: edit visually in n8n, export to git, push. Teammates pull and import. No manual JSON editing needed.

## Workflow Overview

**Webhook** → receives search criteria from the SvelteKit frontend
  ↓
**Google Custom Search** → finds companies matching sector + location + criteria
  ↓
**AI Analysis** (OpenAI) → extracts structured prospect data per company
  ↓
**Google Sheets** → saves each prospect in real time
  ↓
**AI Market Report** + **News API** → generates market analysis + news digest
  ↓
**JSON Response** → returns report to the frontend

## Required Credentials (configure in n8n UI)

- **OpenAI** — for prospect analysis + report generation
- **Google Sheets** — OAuth2 for saving prospects
- **Google Custom Search API** — set `GOOGLE_SEARCH_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID` as n8n environment variables
- **News API** (optional) — set `NEWS_API_KEY` as n8n environment variable

## Environment Variables

Set these in n8n Settings → Environment Variables:

| Variable | Description |
|----------|------------|
| `GOOGLE_SEARCH_API_KEY` | Google Custom Search JSON API key |
| `GOOGLE_SEARCH_ENGINE_ID` | Google Programmable Search Engine CX ID |
| `GOOGLE_SHEET_ID` | Target Google Sheet URL or ID |
| `NEWS_API_KEY` | newsapi.org API key (optional) |

## Calling from SvelteKit

```typescript
const res = await fetch('http://localhost:5679/webhook/prospect-search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sector: 'manufacturing',
    location: 'Nantes, France',
    count: 10,
    criteria: 'uses SAP',
    metrics: 'revenue, headcount'
  })
});
const data = await res.json();
```
