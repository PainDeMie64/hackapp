import { useState } from "react";
import type { SearchRequest } from "../types";

const SECTOR_SUGGESTIONS = [
  "Aéronautique",
  "Automobile",
  "Énergie",
  "Télécommunications",
  "Pharmacie / Santé",
  "Manufacturing",
  "Tech / IT",
  "Consulting",
  "Finance / Banque",
  "Défense",
];

const METRIC_OPTIONS = [
  { value: "revenue", label: "Chiffre d'affaires" },
  { value: "headcount", label: "Effectifs" },
  { value: "revenue_per_fte", label: "CA / Employé" },
  { value: "growth_potential", label: "Potentiel de croissance" },
  { value: "uses_intellectual_services", label: "Utilise des prestations intellectuelles" },
];

interface Props {
  onSubmit: (request: SearchRequest) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: Props) {
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [numProspects, setNumProspects] = useState(10);
  const [conditions, setConditions] = useState("");
  const [metrics, setMetrics] = useState<string[]>([]);

  const toggleMetric = (value: string) => {
    setMetrics((prev) =>
      prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sector,
      location,
      num_prospects: numProspects,
      conditions,
      metrics,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">Nouvelle recherche de prospects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
          <input
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            list="sector-suggestions"
            placeholder="ex: Aéronautique, Tech / IT..."
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-transparent"
          />
          <datalist id="sector-suggestions">
            {SECTOR_SUGGESTIONS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zone géographique</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ex: Toulouse, Ile-de-France, Nantes..."
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de prospects</label>
          <input
            type="number"
            value={numProspects}
            onChange={(e) => setNumProspects(Number(e.target.value))}
            min={1}
            max={30}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Critères supplémentaires</label>
          <input
            type="text"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="ex: utilise SAP, plus de 500 employés..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Métriques à rechercher</label>
        <div className="flex flex-wrap gap-2">
          {METRIC_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleMetric(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                metrics.includes(opt.value)
                  ? "bg-[#0052A5] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !sector || !location}
        className="w-full bg-[#0052A5] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Recherche en cours..." : "Lancer la recherche"}
      </button>
    </form>
  );
}
