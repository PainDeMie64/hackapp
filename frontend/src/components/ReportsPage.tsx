import { useEffect, useState } from "react";
import { FileText, Search, ChevronRight, MapPin, Users, Sparkles } from "lucide-react";
import Markdown from "react-markdown";
import { fetchSearchHistory, fetchSearchDetail, fetchReport } from "../api";
import type { SearchHistoryItem } from "../api";

interface Props {
  onNewSearch: () => void;
}

interface ReportEntry {
  search_id: string;
  sector: string;
  location: string;
  num_prospects: number;
  report: string | null;
}

export function ReportsPage({ onNewSearch }: Props) {
  const [entries, setEntries] = useState<ReportEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const history = await fetchSearchHistory();
        const details = await Promise.all(
          history.map(async (h: SearchHistoryItem) => {
            const detail = await fetchSearchDetail(h.search_id);
            return {
              search_id: h.search_id,
              sector: h.sector,
              location: h.location,
              num_prospects: h.num_prospects,
              report: detail.report,
            };
          })
        );
        setEntries(details);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleGenerate = async (searchId: string) => {
    setGenerating(searchId);
    try {
      const data = await fetchReport(searchId);
      setEntries((prev) =>
        prev.map((e) => (e.search_id === searchId ? { ...e, report: data.report_markdown } : e))
      );
      setExpandedId(searchId);
    } catch {
      // ignore
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="animate-entrance">
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Rapports</h1>

      {loading && (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-surface-200 p-5 animate-pulse">
              <div className="h-5 bg-surface-100 rounded w-48 mb-3" />
              <div className="h-3 bg-surface-100 rounded w-32" />
            </div>
          ))}
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8 text-center">
          <FileText className="w-12 h-12 text-surface-200 mx-auto mb-4" />
          <p className="text-surface-400 mb-4">Aucun rapport disponible. Lancez une recherche pour générer un rapport.</p>
          <button
            onClick={onNewSearch}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors"
          >
            <Search className="w-4 h-4" /> Lancer une recherche
          </button>
        </div>
      )}

      {!loading && entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.search_id} className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900">{entry.sector} — {entry.location}</h3>
                      <div className="flex items-center gap-3 text-xs text-surface-400 mt-0.5">
                        <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {entry.num_prospects} prospects</span>
                        {entry.report && (
                          <span className="inline-flex items-center gap-1 text-score-high bg-score-high-bg px-1.5 py-0.5 rounded font-medium">
                            Rapport généré
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!entry.report && (
                      <button
                        onClick={() => handleGenerate(entry.search_id)}
                        disabled={generating === entry.search_id}
                        className="btn-shine inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 transition-all"
                      >
                        {generating === entry.search_id ? (
                          <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Génération...</>
                        ) : (
                          <><Sparkles className="w-4 h-4" /> Générer</>
                        )}
                      </button>
                    )}
                    {entry.report && (
                      <button
                        onClick={() => setExpandedId(expandedId === entry.search_id ? null : entry.search_id)}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-brand-500 hover:bg-brand-50 rounded-xl transition-colors"
                      >
                        {expandedId === entry.search_id ? "Réduire" : "Consulter"}
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedId === entry.search_id ? "rotate-90" : ""}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {expandedId === entry.search_id && entry.report && (
                <div className="border-t border-surface-200 px-6 lg:px-8 py-6 prose prose-sm max-w-none prose-headings:text-surface-900 prose-p:text-surface-600 prose-strong:text-surface-800 prose-li:text-surface-600">
                  <Markdown>{entry.report}</Markdown>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
