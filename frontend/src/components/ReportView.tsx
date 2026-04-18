import { useState } from "react";
import Markdown from "react-markdown";
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
      setReport("Erreur lors de la génération du rapport.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Rapport d'actualités</h2>
        {!report && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-1.5 bg-[#0052A5] text-white rounded-lg text-sm font-medium hover:bg-[#003d7a] disabled:opacity-50 transition-colors"
          >
            {loading ? "Génération en cours..." : "Générer le rapport"}
          </button>
        )}
      </div>
      {report && (
        <div className="px-6 py-4 prose prose-sm max-w-none prose-headings:text-[#0052A5]">
          <Markdown>{report}</Markdown>
        </div>
      )}
    </div>
  );
}
