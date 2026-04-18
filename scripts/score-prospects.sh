#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$ROOT_DIR/scripts/load-env.sh"

export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-west-2}"
MODEL_ID="${BEDROCK_MODEL:-mistral.mistral-large-2402-v1:0}"
LIMIT="${1:-5}"

echo "==> Scoring prospects with $MODEL_ID (limit: $LIMIT)"
echo ""

# Get companies that don't have scores yet
COMPANIES=$(npx wrangler d1 execute hackapp-db --local --command "
  SELECT c.id, c.name, c.domain, c.sector, c.subsector, c.location_city, c.location_country,
         c.employee_count, c.revenue_eur, c.tech_stack, c.uses_consulting_services, c.description
  FROM companies c
  LEFT JOIN prospect_scores ps ON ps.company_id = c.id
  WHERE ps.id IS NULL
  LIMIT $LIMIT;
" --json 2>/dev/null)

COUNT=$(echo "$COMPANIES" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d[0].get('results',[])))")

if [ "$COUNT" = "0" ]; then
  echo "No unscored companies found."
  exit 0
fi

echo "Found $COUNT companies to score."
echo ""

echo "$COMPANIES" | python3 << 'PYEOF'
import json, sys, subprocess, time, os

MODEL = os.environ.get("MODEL_ID", "mistral.mistral-large-2402-v1:0")

data = json.load(sys.stdin)
companies = data[0].get("results", [])

PROMPT_TEMPLATE = """You are a business analyst scoring companies for ALTEN, a French engineering and technology consulting firm. ALTEN provides engineering services in aerospace, automotive, energy, telecoms, pharma, defense, banking/insurance, and IT.

Score this company on ALL 50 criteria below. Each score is 0-100 (0=no signal, 100=perfect match).

Company data:
- Name: {name}
- Domain: {domain}
- Sector: {sector} / {subsector}
- Location: {city}, {country}
- Employees: {employees}
- Revenue EUR: {revenue}
- Tech stack: {tech_stack}
- Uses consulting: {consulting}
- Description: {description}

Return ONLY a valid JSON object with exactly these keys (no markdown, no explanation):
{{"sector_alignment":N,"naf_code_match":N,"company_size":N,"rd_department_size":N,"geographic_proximity":N,"regional_specialization":N,"company_maturity":N,"organizational_structure":N,"revenue_growth_gap":N,"rd_spending_trend":N,"capex_spikes":N,"capex_to_opex_shift":N,"recent_funding":N,"public_grants":N,"margin_compression":N,"hiring_freeze_with_projects":N,"external_spend_in_financials":N,"engineering_job_volume":N,"stale_job_postings":N,"repeated_repostings":N,"contract_freelance_language":N,"rare_skills_demand":N,"emerging_tech_demand":N,"high_turnover_signals":N,"recruiter_hiring_wave":N,"above_market_salaries":N,"physical_expansion":N,"new_product_launch":N,"platform_migration":N,"program_milestones":N,"digital_transformation":N,"erp_plm_migration":N,"cloud_migration":N,"strategic_partnerships":N,"leadership_change":N,"ma_activity":N,"existing_consulting_usage":N,"legacy_modernization":N,"tech_debt_indicators":N,"cybersecurity_gaps":N,"industry_specific_software":N,"iot_industry4_adoption":N,"eu_regulatory_pressure":N,"french_defense_budget":N,"certification_needs":N,"major_contract_won":N,"crisis_event":N,"industry_event_presence":N,"total_score":N,"score_label":"Hot|Warm|Qualified|Cold"}}

For criteria you cannot assess from the available data, use 50 as a neutral default. The total_score should be a weighted average: firmographics 20%, financial 15%, hiring 25%, project 15%, organizational+tech+regulatory+news 25%."""

for c in companies:
    name = c.get("name", "Unknown")
    print(f"Scoring: {name}...", end=" ", flush=True)

    prompt = PROMPT_TEMPLATE.format(
        name=name,
        domain=c.get("domain", ""),
        sector=c.get("sector", ""),
        subsector=c.get("subsector", ""),
        city=c.get("location_city", ""),
        country=c.get("location_country", ""),
        employees=c.get("employee_count", ""),
        revenue=c.get("revenue_eur", ""),
        tech_stack=c.get("tech_stack", ""),
        consulting=c.get("uses_consulting_services", ""),
        description=c.get("description", ""),
    )

    msg = json.dumps([{"role": "user", "content": [{"text": prompt}]}])
    start = time.time()

    try:
        result = subprocess.run(
            ["aws", "bedrock-runtime", "converse",
             "--model-id", MODEL,
             "--messages", msg,
             "--inference-config", '{"maxTokens":600,"temperature":0.1}'],
            capture_output=True, text=True, timeout=30
        )
        elapsed = time.time() - start

        if result.returncode != 0:
            print(f"FAILED ({result.stderr[:100]})")
            continue

        resp = json.loads(result.stdout)
        text = resp["output"]["message"]["content"][0]["text"]

        # Strip markdown code blocks if present
        text = text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1] if "\n" in text else text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

        scores = json.loads(text)
        total = scores.get("total_score", 0)
        label = scores.get("score_label", "?")

        # Build SQL
        cols = list(scores.keys())
        vals = []
        for col in cols:
            v = scores[col]
            if isinstance(v, str):
                vals.append(f"'{v}'")
            elif v is None:
                vals.append("NULL")
            else:
                vals.append(str(v))

        company_id = c["id"]
        import uuid
        row_id = str(uuid.uuid4())
        now = int(time.time())

        sql_cols = ["id", "company_id"] + [col for col in cols] + ["scored_at", "created_at", "updated_at"]
        sql_vals = [f"'{row_id}'", f"'{company_id}'"] + vals + [str(now), str(now), str(now)]

        insert_sql = f"INSERT OR REPLACE INTO prospect_scores ({','.join(sql_cols)}) VALUES ({','.join(sql_vals)});"

        subprocess.run(
            ["npx", "wrangler", "d1", "execute", "hackapp-db", "--local", "--command", insert_sql],
            capture_output=True, text=True, timeout=10
        )

        usage = resp.get("usage", {})
        toks = usage.get("outputTokens", "?")
        print(f"OK — {total}/100 ({label}) | {elapsed:.1f}s | {toks} tokens")

    except Exception as e:
        print(f"ERROR: {e}")

print("\nDone!")
PYEOF
