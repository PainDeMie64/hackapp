import { useState } from "react";
import { Search, Building2, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react";
import type { SearchRequest } from "../types";

const SECTORS = [
  "Aéronautique",
  "Automobile",
  "Défense",
  "Énergie",
  "Pharmacie / Santé",
  "Télécommunications",
  "Tech / IT",
  "Industrie",
  "Finance / Banque",
  "Autre",
];

const METRIC_OPTIONS = [
  { value: "revenue", label: "Chiffre d'affaires" },
  { value: "headcount", label: "Effectifs" },
  { value: "revenue_per_fte", label: "CA / Employé" },
  { value: "growth_potential", label: "Potentiel de croissance" },
  { value: "uses_intellectual_services", label: "Prestations intellectuelles" },
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
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleMetric = (value: string) => {
    setMetrics((prev) =>
      prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ sector, location, num_prospects: numProspects, conditions, metrics });
  };

  return (
    <div className="animate-entrance">
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Nouvelle Recherche</h1>

      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50">
              <Search className="w-7 h-7 text-brand-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-surface-900">Recherche par critères</h2>
              <p className="text-sm text-surface-400">Définissez les critères de prospection pour ALTEN</p>
            </div>
          </div>

          {/* Main fields */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-surface-700">Secteur d'activité</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Building2 className="w-5 h-5 text-surface-400" />
                </div>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  required
                  className="w-full h-14 rounded-xl border-2 border-surface-200 bg-white pl-12 pr-4 text-lg text-surface-900 appearance-none focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                >
                  <option value="">Choisir un secteur</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-surface-700">Zone géographique</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MapPin className="w-5 h-5 text-surface-400" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="ex: Toulouse, Ile-de-France..."
                  required
                  className="w-full h-14 rounded-xl border-2 border-surface-200 bg-white pl-12 pr-4 text-lg placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            {/* Prospect count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-surface-700">Nombre de prospects</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Users className="w-5 h-5 text-surface-400" />
                </div>
                <input
                  type="number"
                  value={numProspects}
                  onChange={(e) => setNumProspects(Number(e.target.value))}
                  min={1}
                  max={30}
                  className="w-full h-14 rounded-xl border-2 border-surface-200 bg-white pl-12 pr-4 text-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-surface-700">Mots-clés et critères libres</label>
            <textarea
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              rows={3}
              placeholder='ex: "utilise SAP", "certifié ISO 9001", "plus de 500 employés"...'
              className="w-full rounded-xl border-2 border-surface-200 bg-white px-4 py-3 text-sm placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
            />
          </div>

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-brand-500 transition-colors"
          >
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Critères avancés
          </button>

          {showAdvanced && (
            <div className="bg-surface-50 rounded-xl p-6 space-y-4 animate-entrance">
              <label className="text-sm font-medium text-surface-700">Métriques à rechercher</label>
              <div className="flex flex-wrap gap-2">
                {METRIC_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMetric(opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      metrics.includes(opt.value)
                        ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                        : "bg-white border border-surface-200 text-surface-600 hover:border-brand-300 hover:text-brand-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !sector || !location}
            className="btn-shine w-full h-14 bg-brand-500 text-white rounded-xl font-semibold text-lg hover:bg-brand-600 active:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Recherche en cours...
              </span>
            ) : (
              "Lancer la recherche"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
