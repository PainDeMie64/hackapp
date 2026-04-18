import { ArrowLeft, Globe, MapPin, Building2, Users, TrendingUp, Sparkles, ExternalLink, Download, Hash } from "lucide-react";
import clsx from "clsx";
import type { Prospect } from "../types";
import { CompanyAvatar } from "./CompanyAvatar";
import { ScoreRing } from "./ScoreRing";
import { getExportUrl } from "../api";

const CONFIDENCE_SCORE: Record<string, number> = { high: 90, medium: 65, low: 35 };
const CONFIDENCE_LABEL: Record<string, { label: string; cls: string }> = {
  high: { label: "Hot", cls: "bg-score-high-bg text-score-high border-score-high" },
  medium: { label: "Warm", cls: "bg-score-mid-bg text-score-mid border-score-mid" },
  low: { label: "Cold", cls: "bg-score-low-bg text-score-low border-score-low" },
};

const SCORE_DIMENSIONS = [
  { key: "revenue", label: "Chiffre d'affaires", weight: 20 },
  { key: "headcount", label: "Effectifs", weight: 15 },
  { key: "growth_potential", label: "Potentiel de croissance", weight: 25 },
  { key: "uses_intellectual_services", label: "Prestations intellectuelles", weight: 15 },
  { key: "news_summary", label: "Actualités & signaux", weight: 15 },
  { key: "source_urls", label: "Richesse des sources", weight: 10 },
];

function dimensionScore(prospect: Prospect, key: string): number {
  const val = (prospect as Record<string, unknown>)[key];
  if (!val) return 10;
  if (key === "source_urls") return Math.min((val as string[]).length * 30, 100);
  if (key === "growth_potential") {
    const s = String(val).toLowerCase();
    if (s.includes("fort")) return 90;
    if (s.includes("moyen")) return 60;
    return 30;
  }
  if (key === "uses_intellectual_services") {
    const s = String(val).toLowerCase();
    if (s.includes("oui")) return 85;
    if (s.includes("non")) return 20;
    return 50;
  }
  return typeof val === "string" && val.length > 10 ? 75 : 40;
}

interface Props {
  prospect: Prospect;
  searchId: string;
  onBack: () => void;
}

export function ProspectDetail({ prospect, searchId, onBack }: Props) {
  const score = CONFIDENCE_SCORE[prospect.confidence] || 50;
  const tier = CONFIDENCE_LABEL[prospect.confidence] || CONFIDENCE_LABEL.medium;

  return (
    <div className="space-y-6 animate-entrance">
      {/* Header */}
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-brand-500 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour aux résultats
      </button>

      {/* Hero banner */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <CompanyAvatar name={prospect.name} size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-surface-900">{prospect.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={clsx("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border-2", tier.cls)}>
                    {score} · {tier.label}
                  </span>
                  <span className="text-sm text-surface-400">{prospect.sector} · {prospect.location}</span>
                </div>
              </div>
            </div>
            {prospect.website && (
              <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600 font-medium">
                <Globe className="w-4 h-4" /> {prospect.website}
              </a>
            )}
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <a href={getExportUrl(searchId, "csv")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </a>
              <a href={getExportUrl(searchId, "xlsx")} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-surface-200 rounded-xl hover:bg-surface-50 transition-colors">
                <Download className="w-4 h-4" /> Export XLSX
              </a>
            </div>
          </div>
          <ScoreRing score={score} size="lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Score breakdown */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6" style={{ animationDelay: "50ms" }}>
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Score Prospect</h2>
            <div className="flex items-center gap-4 mb-6">
              <ScoreRing score={score} size="md" />
              <div>
                <p className="text-2xl font-bold text-surface-900">{score}<span className="text-surface-400 text-base">/100</span></p>
                <p className="text-xs text-surface-400">Score global</p>
              </div>
            </div>
            <div className="space-y-3">
              {SCORE_DIMENSIONS.map((dim, i) => {
                const dimScore = dimensionScore(prospect, dim.key);
                const barColor = dimScore >= 80 ? "bg-score-high" : dimScore >= 60 ? "bg-score-mid" : "bg-score-low";
                return (
                  <div key={dim.key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-surface-600 font-medium">{dim.label}</span>
                      <span className="text-surface-400">{dimScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className={clsx("h-full rounded-full animate-bar-grow", barColor)}
                        style={{ width: `${dimScore}%`, animationDelay: `${i * 100}ms` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Analysis */}
          {(prospect.description || prospect.news_summary) && (
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6" style={{ animationDelay: "120ms" }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-brand-500" />
                <h2 className="text-lg font-semibold text-surface-900">Pourquoi ce prospect</h2>
                <span className="text-xs bg-brand-50 text-brand-500 px-2 py-0.5 rounded-full font-semibold">IA</span>
              </div>
              {prospect.description && (
                <p className="text-sm text-surface-600 leading-relaxed mb-3">{prospect.description}</p>
              )}
              {prospect.news_summary && (
                <div className="bg-surface-50 border-l-4 border-l-brand-500 rounded-r-xl px-4 py-3">
                  <p className="text-sm text-surface-600 italic">{prospect.news_summary}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key metrics */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6" style={{ animationDelay: "200ms" }}>
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Métriques clés</h2>
            <div className="grid grid-cols-2 gap-3">
              {prospect.headcount && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><Users className="w-3.5 h-3.5" /> Effectif</div>
                  <p className="text-sm font-semibold text-surface-900">{prospect.headcount}</p>
                </div>
              )}
              {prospect.revenue && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><TrendingUp className="w-3.5 h-3.5" /> CA</div>
                  <p className="text-sm font-semibold text-surface-900">{prospect.revenue}</p>
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><Building2 className="w-3.5 h-3.5" /> Secteur</div>
                <p className="text-sm font-semibold text-surface-900">{prospect.sector}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><MapPin className="w-3.5 h-3.5" /> Localisation</div>
                <p className="text-sm font-semibold text-surface-900">{prospect.location}</p>
              </div>
              {prospect.revenue_per_fte && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><Hash className="w-3.5 h-3.5" /> CA/Employé</div>
                  <p className="text-sm font-semibold text-surface-900">{prospect.revenue_per_fte}</p>
                </div>
              )}
              {prospect.growth_potential && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-400 mb-1"><TrendingUp className="w-3.5 h-3.5" /> Croissance</div>
                  <p className="text-sm font-semibold text-surface-900">{prospect.growth_potential.split(" - ")[0]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Sources</h2>
            <div className="flex flex-wrap gap-2">
              {prospect.source_urls.map((url, i) => {
                let label: string;
                try { label = new URL(url).hostname.replace("www.", ""); } catch { label = `Source ${i + 1}`; }
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-surface-100 text-surface-600 hover:bg-surface-200 px-2.5 py-1.5 rounded-lg font-medium transition-colors">
                    <ExternalLink className="w-3 h-3" /> {label}
                  </a>
                );
              })}
              {prospect.source_urls.length === 0 && <p className="text-xs text-surface-400">Aucune source disponible</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
