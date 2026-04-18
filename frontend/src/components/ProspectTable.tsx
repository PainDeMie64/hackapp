import { useState } from "react";
import { Trophy, Sparkles, ChevronRight, Users, Building2, MapPin, TrendingUp, Globe, ExternalLink } from "lucide-react";
import clsx from "clsx";
import type { Prospect } from "../types";
import { CompanyAvatar } from "./CompanyAvatar";
import { ScoreRing } from "./ScoreRing";

const CONFIDENCE_SCORE: Record<string, number> = { high: 90, medium: 65, low: 35 };

function getScore(p: Prospect): number {
  return CONFIDENCE_SCORE[p.confidence] || 50;
}

function HeroCard({ prospect }: { prospect: Prospect }) {
  const score = getScore(prospect);

  return (
    <div className="relative bg-white rounded-2xl border border-surface-200 shadow-sm p-6 lg:p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-entrance">
      {/* Ribbon */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1.5 bg-score-high-bg text-score-high text-xs font-semibold px-3 py-1.5 rounded-full border border-score-high/20">
          <Trophy className="w-3.5 h-3.5" /> Meilleur prospect
        </span>
      </div>

      {/* Watermark */}
      <Search className="absolute top-4 left-4 w-28 h-28 text-surface-900/5 pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* Company info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <CompanyAvatar name={prospect.name} size="lg" />
            <div>
              <h2 className="text-2xl font-bold text-surface-900">{prospect.name}</h2>
              <p className="text-sm text-surface-400">{prospect.sector} · {prospect.location}</p>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {prospect.headcount && (
              <div className="bg-surface-50 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><Users className="w-3.5 h-3.5" /> Effectif</div>
                <p className="text-sm font-semibold text-surface-900">{prospect.headcount}</p>
              </div>
            )}
            {prospect.revenue && (
              <div className="bg-surface-50 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><TrendingUp className="w-3.5 h-3.5" /> CA</div>
                <p className="text-sm font-semibold text-surface-900">{prospect.revenue}</p>
              </div>
            )}
            <div className="bg-surface-50 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><Building2 className="w-3.5 h-3.5" /> Secteur</div>
              <p className="text-sm font-semibold text-surface-900">{prospect.sector}</p>
            </div>
            <div className="bg-surface-50 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><MapPin className="w-3.5 h-3.5" /> Localisation</div>
              <p className="text-sm font-semibold text-surface-900">{prospect.location}</p>
            </div>
          </div>

          {/* AI Analysis */}
          {(prospect.description || prospect.news_summary) && (
            <div className="bg-surface-50 border-l-4 border-l-brand-500 rounded-r-xl px-4 py-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold text-brand-500">Analyse IA</span>
              </div>
              <p className="text-sm text-surface-600 italic leading-relaxed">
                {prospect.description || prospect.news_summary}
              </p>
            </div>
          )}

          {/* Sources */}
          <div className="flex flex-wrap items-center gap-2">
            {prospect.website && (
              <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs bg-brand-50 text-brand-600 hover:bg-brand-100 px-2.5 py-1 rounded-lg font-medium transition-colors">
                <Globe className="w-3.5 h-3.5" /> Site web
              </a>
            )}
            {prospect.source_urls.map((url, i) => {
              let label: string;
              try { label = new URL(url).hostname.replace("www.", ""); } catch { label = `Source ${i + 1}`; }
              return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-surface-100 text-surface-600 hover:bg-surface-200 px-2.5 py-1 rounded-lg font-medium transition-colors">
                  <ExternalLink className="w-3 h-3" /> {label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Score ring */}
        <div className="flex items-start justify-center lg:justify-end">
          <ScoreRing score={score} size="lg" />
        </div>
      </div>
    </div>
  );
}

function TimelineRow({ prospect, rank }: { prospect: Prospect; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const score = getScore(prospect);
  const borderColor = score >= 80 ? "border-l-score-high" : score >= 60 ? "border-l-score-mid" : "border-l-score-low";

  return (
    <div className="relative pl-8">
      {/* Timeline node */}
      <div className="absolute left-0 top-6 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-white z-10" />

      <div
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          "bg-white rounded-2xl border border-surface-200 border-l-4 p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.005] animate-entrance",
          borderColor,
          rank % 2 === 0 && "bg-surface-50/50"
        )}
        style={{ animationDelay: `${rank * 60}ms` }}
      >
        <div className="flex items-center gap-4">
          {/* Rank */}
          <span className="text-lg font-bold text-surface-300 w-6 text-center">#{rank}</span>

          <CompanyAvatar name={prospect.name} size="sm" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-surface-900">{prospect.name}</h3>
              <span className={clsx(
                "text-xs font-semibold px-2 py-0.5 rounded-lg border-2",
                score >= 80 ? "bg-score-high-bg text-score-high border-score-high" :
                score >= 60 ? "bg-score-mid-bg text-score-mid border-score-mid" :
                "bg-score-low-bg text-score-low border-score-low"
              )}>
                {score}
              </span>
            </div>
            <p className="text-xs text-surface-400 mt-0.5">
              {prospect.sector} · {prospect.headcount || "—"} · {prospect.revenue || "—"}
            </p>
            {prospect.news_summary && (
              <p className="text-xs text-surface-500 italic mt-1 truncate">{prospect.news_summary}</p>
            )}
          </div>

          <ChevronRight className={clsx("w-4 h-4 text-surface-300 transition-transform shrink-0", expanded && "rotate-90")} />
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-surface-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm animate-entrance">
            {prospect.description && <div><span className="font-medium text-surface-700">Description :</span> {prospect.description}</div>}
            {prospect.revenue_per_fte && <div><span className="font-medium text-surface-700">CA/Employé :</span> {prospect.revenue_per_fte}</div>}
            {prospect.growth_potential && <div><span className="font-medium text-surface-700">Croissance :</span> {prospect.growth_potential}</div>}
            {prospect.uses_intellectual_services && <div><span className="font-medium text-surface-700">Prestations :</span> {prospect.uses_intellectual_services}</div>}
            {prospect.website && (
              <div>
                <span className="font-medium text-surface-700">Site :</span>{" "}
                <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">{prospect.website}</a>
              </div>
            )}
            {prospect.source_urls.length > 0 && (
              <div className="md:col-span-2 flex flex-wrap items-center gap-2 pt-1">
                <span className="font-medium text-surface-700 text-sm">Sources :</span>
                {prospect.source_urls.map((url, i) => {
                  let label: string;
                  try { label = new URL(url).hostname.replace("www.", ""); } catch { label = `Source ${i + 1}`; }
                  return (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-surface-100 text-surface-600 hover:bg-surface-200 px-2 py-0.5 rounded-lg font-medium transition-colors">
                      <ExternalLink className="w-3 h-3" /> {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

export function ProspectTable({ prospects }: { prospects: Prospect[] }) {
  if (prospects.length === 0) return null;

  const hero = prospects[0];
  const rest = prospects.slice(1);

  return (
    <div className="space-y-6">
      {/* Hero card for #1 */}
      <HeroCard prospect={hero} />

      {/* Timeline for the rest */}
      {rest.length > 0 && (
        <div className="relative">
          {/* Vertical dashed line */}
          <div className="absolute left-[5px] top-0 bottom-0 border-l-2 border-dashed border-surface-200" />

          <div className="space-y-3">
            {rest.map((p, i) => (
              <TimelineRow key={`${p.name}-${i}`} prospect={p} rank={i + 2} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
