import { CheckCircle, Circle, Loader2 } from "lucide-react";
import clsx from "clsx";

interface Props {
  status: string;
  prospectsFound: number;
  totalRequested: number;
}

const SOURCES = ["DuckDuckGo", "Web Search", "News API", "Claude AI", "Google Sheets", "Analyse IA", "Web Scraping", "Enrichissement"];

function getSteps(prospectsFound: number, totalRequested: number) {
  const progress = totalRequested > 0 ? prospectsFound / totalRequested : 0;
  return [
    { label: "Recherche d'entreprises...", done: progress > 0 },
    { label: "Analyse des données web...", done: progress > 0.2 },
    { label: "Enrichissement des profils", done: progress > 0.5 },
    { label: "Vérification des informations", done: progress > 0.8 },
    { label: "Finalisation des résultats", done: progress >= 1 },
  ];
}

export function LoadingView({ status, prospectsFound, totalRequested }: Props) {
  const progress = totalRequested > 0 ? Math.round((prospectsFound / totalRequested) * 100) : 5;
  const steps = getSteps(prospectsFound, totalRequested);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-entrance">
      {/* Pulsing orb */}
      <div className="relative mb-8">
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-brand-500/10" style={{ animation: "pulse-ring 3s ease-in-out infinite" }} />
        <div className="absolute inset-2 w-28 h-28 rounded-full bg-brand-500/5" style={{ animation: "pulse-ring 3s ease-in-out infinite 0.5s" }} />
        <div className="relative w-32 h-32 rounded-full bg-brand-50 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-80 mb-6">
        <div className="flex justify-between text-xs text-surface-400 mb-2">
          <span>{prospectsFound}/{totalRequested} prospects</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.max(progress, 5)}%`, animation: "shimmer 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Status */}
      <p className="text-sm text-surface-600 font-medium mb-8 text-center max-w-sm">{status}</p>

      {/* Steps */}
      <div className="space-y-3 mb-8">
        {steps.map((step, i) => {
          const isActive = !step.done && (i === 0 || steps[i - 1].done);
          return (
            <div key={i} className="flex items-center gap-3">
              {step.done ? (
                <CheckCircle className="w-5 h-5 text-score-high shrink-0" />
              ) : isActive ? (
                <div className="relative">
                  <Loader2 className="w-5 h-5 text-brand-500 animate-spin shrink-0" />
                  <div className="absolute inset-0 w-5 h-5 rounded-full bg-brand-500/20 animate-ping" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-surface-300 shrink-0" />
              )}
              <span className={clsx("text-sm", step.done ? "text-surface-600" : isActive ? "text-surface-900 font-medium" : "text-surface-300")}>
                {step.label}
              </span>
              {step.done && (
                <span className="text-xs bg-score-high-bg text-score-high px-2 py-0.5 rounded-full font-medium">OK</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Source marquee */}
      <div className="w-80 overflow-hidden">
        <div className="flex gap-4 text-xs text-surface-400" style={{ animation: "marquee-scroll 15s linear infinite" }}>
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span key={i} className="whitespace-nowrap bg-surface-50 px-3 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      <p className="text-xs text-surface-300 mt-6">L'analyse prend généralement entre 30 et 90 secondes</p>
    </div>
  );
}
