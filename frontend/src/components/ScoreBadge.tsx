import { CheckCircle, AlertTriangle, MinusCircle, XCircle } from "lucide-react";
import clsx from "clsx";

interface Props {
  score: number;
  size?: "sm" | "md";
}

function getTier(score: number) {
  if (score >= 80) return { label: "Hot", color: "bg-score-high-bg text-score-high border-score-high", Icon: CheckCircle };
  if (score >= 60) return { label: "Warm", color: "bg-score-mid-bg text-score-mid border-score-mid", Icon: AlertTriangle };
  if (score >= 40) return { label: "Qualified", color: "bg-amber-100 text-amber-700 border-amber-500", Icon: MinusCircle };
  return { label: "Cold", color: "bg-score-low-bg text-score-low border-score-low", Icon: XCircle };
}

export function ScoreBadge({ score, size = "sm" }: Props) {
  const { label, color, Icon } = getTier(score);
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-lg border-2 font-semibold",
        color,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      )}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {score}
      <span className="opacity-70">· {label}</span>
    </span>
  );
}
