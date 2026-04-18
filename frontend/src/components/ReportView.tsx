import { useState } from "react";
import Markdown from "react-markdown";
import { FileText, Download, Sparkles } from "lucide-react";
import { fetchReport } from "../api";

interface Props {
  searchId: string;
  isComplete: boolean;
}

export function ReportView({ searchId, isComplete }: Props) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isComplete) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await fetchReport(searchId);
      setReport(data.report_markdown);
    } catch {
      setReport("# Erreur\n\nImpossible de générer le rapport. Réessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden animate-entrance">
      <div className="px-6 py-4 border-b border-surface-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-surface-900">Rapport d'intelligence commerciale</h2>
            <p className="text-xs text-surface-400">Analyse IA des prospects et du marché</p>
          </div>
        </div>
        {!report && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Génération...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Générer le rapport
              </>
            )}
          </button>
        )}
        {report && (
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-50 rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Exporter PDF
          </button>
        )}
      </div>
      {report && (
        <div className="px-6 lg:px-8 py-6 prose prose-sm max-w-none prose-headings:text-surface-900 prose-p:text-surface-600 prose-strong:text-surface-800 prose-li:text-surface-600 prose-a:text-brand-500">
          <Markdown>{report}</Markdown>
        </div>
      )}
    </div>
  );
}
