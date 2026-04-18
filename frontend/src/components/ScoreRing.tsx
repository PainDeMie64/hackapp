import clsx from "clsx";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { wh: "w-12 h-12", text: "text-sm", stroke: 3, r: 18 },
  md: { wh: "w-16 h-16", text: "text-lg", stroke: 3.5, r: 24 },
  lg: { wh: "w-24 h-24", text: "text-2xl", stroke: 4, r: 38 },
};

export function ScoreRing({ score, size = "md" }: Props) {
  const s = SIZES[size];
  const circumference = 2 * Math.PI * s.r;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "text-score-high" : score >= 60 ? "text-score-mid" : "text-score-low";
  const bgColor =
    score >= 80 ? "text-score-high/15" : score >= 60 ? "text-score-mid/15" : "text-score-low/15";

  return (
    <div className={clsx("relative inline-flex items-center justify-center", s.wh)}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${(s.r + s.stroke) * 2} ${(s.r + s.stroke) * 2}`}>
        <circle
          cx={s.r + s.stroke}
          cy={s.r + s.stroke}
          r={s.r}
          fill="none"
          strokeWidth={s.stroke}
          className={clsx("stroke-current", bgColor)}
        />
        <circle
          cx={s.r + s.stroke}
          cy={s.r + s.stroke}
          r={s.r}
          fill="none"
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={clsx("stroke-current transition-all duration-1000", color)}
        />
      </svg>
      <span className={clsx("font-bold leading-none", s.text, color)}>{score}</span>
    </div>
  );
}
