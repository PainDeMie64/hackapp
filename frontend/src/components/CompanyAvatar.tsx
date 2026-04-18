import clsx from "clsx";

const COLORS = [
  "bg-brand-100 text-brand-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-cyan-100 text-cyan-700",
];

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  return Math.abs(h);
}

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export function CompanyAvatar({ name, size = "md" }: Props) {
  const initials = name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const colorClass = COLORS[hashName(name) % COLORS.length];

  return (
    <div
      className={clsx(
        "rounded-xl font-semibold flex items-center justify-center shrink-0",
        SIZES[size],
        colorClass
      )}
    >
      {initials}
    </div>
  );
}
