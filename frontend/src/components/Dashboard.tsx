import { Search, FileBarChart, Clock, ArrowRight } from "lucide-react";

interface Props {
  onNavigate: (page: "search" | "reports" | "history") => void;
}

export function Dashboard({ onNavigate }: Props) {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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

      {/* Info cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 relative bg-white rounded-2xl border border-surface-200 shadow-sm p-6 overflow-hidden hover:shadow-lg transition-shadow">
          <Search className="absolute top-4 right-4 w-28 h-28 text-surface-900/[0.03] pointer-events-none" />
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Prospects</p>
          <h2 className="text-xl font-bold text-surface-900 mb-2">Agent IA de prospection</h2>
          <p className="text-sm text-surface-500 mb-4 max-w-md">
            Recherchez automatiquement des entreprises prospects pour ALTEN. L'agent IA analyse le web, enrichit les données et génère des rapports en temps réel.
          </p>
          <button
            onClick={() => onNavigate("search")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            Lancer une recherche <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-5 relative bg-white rounded-2xl border border-surface-200 shadow-sm p-6 overflow-hidden hover:shadow-lg transition-shadow">
          <Clock className="absolute top-4 right-4 w-28 h-28 text-surface-900/[0.03] pointer-events-none" />
          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Historique</p>
          <h2 className="text-xl font-bold text-surface-900 mb-2">Recherches passées</h2>
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
