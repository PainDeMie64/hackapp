import { useEffect, useState } from "react";
import { Search, FileBarChart, Clock, ArrowRight, Users, BarChart3, Zap, FileText } from "lucide-react";
import { fetchDashboard } from "../api";
import type { DashboardData } from "../api";

interface Props {
  onNavigate: (page: "search" | "reports" | "history") => void;
}

const CONFIDENCE_COLORS: Record<string, string> = {
  high: "bg-score-high-bg text-score-high",
  medium: "bg-score-mid-bg text-score-mid",
  low: "bg-score-low-bg text-score-low",
};

export function Dashboard({ onNavigate }: Props) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard().then(setData).catch(() => {});
  }, []);

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasData = data && data.total_prospects > 0;

  return (
    <div className="space-y-6 animate-entrance">
      {/* Hero */}
      <div className="bg-brand-50 rounded-2xl px-6 py-6">
        <h1 className="text-2xl font-bold text-surface-900">Bonjour, Elias</h1>
        <p className="text-sm text-surface-500 capitalize">{today}</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("search")}
          className="group flex items-center gap-4 bg-white rounded-2xl border border-surface-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
            <Search className="w-6 h-6 text-brand-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-surface-900">Nouvelle recherche</p>
            <p className="text-xs text-surface-400">Trouver de nouveaux prospects</p>
          </div>
          <ArrowRight className="w-5 h-5 text-surface-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
        </button>

        <button
          onClick={() => onNavigate("reports")}
          className="group flex items-center gap-4 bg-white rounded-2xl border border-surface-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
            <FileBarChart className="w-6 h-6 text-brand-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-surface-900">Voir les rapports</p>
            <p className="text-xs text-surface-400">Rapports d'intelligence commerciale</p>
          </div>
          <ArrowRight className="w-5 h-5 text-surface-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* KPI cards */}
      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 border-l-4 border-l-brand-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-brand-500" />
              </div>
              <span className="text-xs text-surface-400">Prospects</span>
            </div>
            <p className="text-2xl font-bold text-surface-900">{data.total_prospects}</p>
          </div>
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 border-l-4 border-l-score-high">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-score-high-bg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-score-high" />
              </div>
              <span className="text-xs text-surface-400">Score moyen</span>
            </div>
            <p className="text-2xl font-bold text-surface-900">{data.avg_score}%</p>
          </div>
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 border-l-4 border-l-score-mid">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-score-mid-bg flex items-center justify-center">
                <Zap className="w-4 h-4 text-score-mid" />
              </div>
              <span className="text-xs text-surface-400">Recherches</span>
            </div>
            <p className="text-2xl font-bold text-surface-900">{data.total_searches}</p>
          </div>
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-4 border-l-4 border-l-brand-400">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-brand-500" />
              </div>
              <span className="text-xs text-surface-400">Rapports</span>
            </div>
            <p className="text-2xl font-bold text-surface-900">{data.reports_count}</p>
          </div>
        </div>
      )}

      {/* Main cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 relative bg-white rounded-2xl border border-surface-200 shadow-sm p-6 overflow-hidden hover:shadow-lg transition-shadow">
          <Search className="absolute top-4 right-4 w-28 h-28 text-surface-900/[0.03] pointer-events-none" />
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Prospects</p>
          {hasData ? (
            <>
              <h2 className="text-xl font-bold text-surface-900 mb-3">{data.total_prospects} entreprises identifiées</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-score-high-bg text-score-high border border-score-high/20">
                  Hot · {data.band_counts.high}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-score-mid-bg text-score-mid border border-score-mid/20">
                  Warm · {data.band_counts.medium}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-100 text-surface-500 border border-surface-200">
                  Cold · {data.band_counts.low}
                </span>
              </div>
              {data.top_prospects.length > 0 && (
                <div className="space-y-2 mb-4">
                  {data.top_prospects.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-surface-700 font-medium">{p.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONFIDENCE_COLORS[p.confidence]}`}>
                        {p.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Agent IA de prospection</h2>
              <p className="text-sm text-surface-500 mb-4 max-w-md">
                Recherchez automatiquement des entreprises prospects pour ALTEN. L'agent IA analyse le web, enrichit les données et génère des rapports en temps réel.
              </p>
            </>
          )}
          <button
            onClick={() => onNavigate("search")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            {hasData ? "Voir les résultats" : "Lancer une recherche"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-5 relative bg-white rounded-2xl border border-surface-200 shadow-sm p-6 overflow-hidden hover:shadow-lg transition-shadow">
          <Clock className="absolute top-4 right-4 w-28 h-28 text-surface-900/[0.03] pointer-events-none" />
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Historique</p>
          <h2 className="text-xl font-bold text-surface-900 mb-2">
            {hasData ? `${data.total_searches} recherche${data.total_searches > 1 ? "s" : ""}` : "Recherches passées"}
          </h2>
          <p className="text-sm text-surface-500 mb-4">
            Retrouvez vos recherches précédentes et les prospects identifiés.
          </p>
          <button
            onClick={() => onNavigate("history")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            Voir l'historique <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
