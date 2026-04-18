import { useEffect, useState } from "react";
import { Clock, Search, MapPin, Building2, ChevronRight, Users } from "lucide-react";
import clsx from "clsx";
import { fetchSearchHistory } from "../api";
import type { SearchHistoryItem } from "../api";

const CONFIDENCE_LABEL: Record<string, { label: string; class: string }> = {
  high: { label: "Haute", class: "bg-score-high-bg text-score-high" },
  medium: { label: "Moyenne", class: "bg-score-mid-bg text-score-mid" },
  low: { label: "Faible", class: "bg-score-low-bg text-score-low" },
};

interface Props {
  onViewResults: (searchId: string) => void;
  onNewSearch: () => void;
}

export function HistoryView({ onViewResults, onNewSearch }: Props) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchHistory()
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-entrance">
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Historique des Recherches</h1>

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-surface-200 p-5 animate-pulse">
              <div className="h-4 bg-surface-100 rounded w-48 mb-3" />
              <div className="h-3 bg-surface-100 rounded w-32" />
            </div>
          ))}
        </div>
      )}

      {!loading && history.length === 0 && (
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8 text-center">
          <Clock className="w-12 h-12 text-surface-200 mx-auto mb-4" />
          <p className="text-surface-400 mb-4">Aucune recherche passée pour le moment.</p>
          <button
            onClick={onNewSearch}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors"
          >
            <Search className="w-4 h-4" /> Lancer une recherche
          </button>
        </div>
      )}

      {!loading && history.length > 0 && (
        <div className="space-y-3">
          {history.map((item) => {
            const conf = CONFIDENCE_LABEL[item.best_confidence] || CONFIDENCE_LABEL.medium;
            return (
              <button
                key={item.search_id}
                onClick={() => onViewResults(item.search_id)}
                className="w-full text-left bg-white rounded-2xl border border-surface-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-surface-900">{item.sector}</h3>
                      <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full", conf.class)}>
                        Confiance {conf.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-surface-400">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {item.num_prospects} prospects</span>
                      <span className={clsx(
                        "px-1.5 py-0.5 rounded text-xs font-medium",
                        item.status === "completed" ? "bg-score-high-bg text-score-high" : "bg-score-low-bg text-score-low"
                      )}>
                        {item.status === "completed" ? "Terminée" : "Erreur"}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-surface-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
