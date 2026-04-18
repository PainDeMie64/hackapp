import { Hash, BarChart3, Zap } from "lucide-react";
import type { Prospect } from "../types";

interface Props {
  prospects: Prospect[];
  sheetUrl: string | null;
  isComplete: boolean;
}

function avgConfidence(prospects: Prospect[]): number {
  const map: Record<string, number> = { high: 90, medium: 65, low: 35 };
  if (prospects.length === 0) return 0;
  return Math.round(prospects.reduce((s, p) => s + (map[p.confidence] || 50), 0) / prospects.length);
}

function maxConfidence(prospects: Prospect[]): number {
  const map: Record<string, number> = { high: 90, medium: 65, low: 35 };
  return Math.max(...prospects.map((p) => map[p.confidence] || 50), 0);
}

export function StatusBar({ prospects, sheetUrl, isComplete }: Props) {
  if (prospects.length === 0 && !isComplete) return null;

  const avg = avgConfidence(prospects);
  const max = maxConfidence(prospects);

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white rounded-2xl border border-surface-200 shadow-sm px-6 py-4 animate-entrance">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
          <Hash className="w-4 h-4 text-brand-500" />
        </div>
        <div>
          <p className="text-xs text-surface-400">Résultats</p>
          <p className="text-sm font-bold text-surface-900">{prospects.length}</p>
        </div>
      </div>

      <div className="w-px h-8 bg-surface-200" />

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-brand-500" />
        </div>
        <div>
          <p className="text-xs text-surface-400">Confiance moy.</p>
          <p className="text-sm font-bold text-surface-900">{avg}%</p>
        </div>
      </div>

      <div className="w-px h-8 bg-surface-200" />

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-score-high-bg flex items-center justify-center">
          <Zap className="w-4 h-4 text-score-high" />
        </div>
        <div>
          <p className="text-xs text-surface-400">Max</p>
          <p className="text-sm font-bold text-surface-900">{max}%</p>
        </div>
      </div>

      <div className="flex-1" />

      {sheetUrl && (
        <a
          href={sheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
        >
          Ouvrir Google Sheet →
        </a>
      )}
    </div>
  );
}
