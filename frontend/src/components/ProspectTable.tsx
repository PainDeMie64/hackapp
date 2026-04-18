import { useState } from "react";
import type { Prospect } from "../types";

const CONFIDENCE_COLORS: Record<string, string> = {
  high: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-red-100 text-red-800",
};

function ProspectRow({ prospect, index }: { prospect: Prospect; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="hover:bg-gray-50 cursor-pointer transition-colors animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <td className="px-4 py-3 text-sm font-medium text-gray-900">{prospect.name}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{prospect.location}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{prospect.revenue || "—"}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{prospect.headcount || "—"}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{prospect.growth_potential || "—"}</td>
        <td className="px-4 py-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CONFIDENCE_COLORS[prospect.confidence] || CONFIDENCE_COLORS.medium}`}>
            {prospect.confidence}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50">
          <td colSpan={6} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {prospect.description && (
                <div><span className="font-medium text-gray-700">Description :</span> {prospect.description}</div>
              )}
              {prospect.website && (
                <div>
                  <span className="font-medium text-gray-700">Site web :</span>{" "}
                  <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="text-[#0052A5] hover:underline">
                    {prospect.website}
                  </a>
                </div>
              )}
              {prospect.revenue_per_fte && (
                <div><span className="font-medium text-gray-700">CA/Employé :</span> {prospect.revenue_per_fte}</div>
              )}
              {prospect.uses_intellectual_services && (
                <div><span className="font-medium text-gray-700">Prestations intellectuelles :</span> {prospect.uses_intellectual_services}</div>
              )}
              {prospect.news_summary && (
                <div className="md:col-span-2"><span className="font-medium text-gray-700">Actualités :</span> {prospect.news_summary}</div>
              )}
              {prospect.source_urls.length > 0 && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Sources :</span>{" "}
                  {prospect.source_urls.map((url, i) => (
                    <span key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#0052A5] hover:underline text-xs">
                        [{i + 1}]
                      </a>{" "}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function ProspectTable({ prospects }: { prospects: Prospect[] }) {
  if (prospects.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Prospects trouvés ({prospects.length})
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Cliquez sur une ligne pour voir les détails</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Entreprise</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Localisation</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CA</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Effectifs</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Croissance</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Confiance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prospects.map((p, i) => (
              <ProspectRow key={`${p.name}-${i}`} prospect={p} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
