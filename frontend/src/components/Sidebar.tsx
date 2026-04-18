import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Clock,
  FileText,
  ChevronLeft,
} from "lucide-react";
import clsx from "clsx";

type Page = "home" | "search" | "history" | "reports";

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "home", label: "Accueil", icon: LayoutDashboard },
  { id: "search", label: "Recherche", icon: Search },
  { id: "history", label: "Historique", icon: Clock },
  { id: "reports", label: "Rapports", icon: FileText },
];

export function Sidebar({ currentPage, onNavigate }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          "hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 border-r border-surface-200/50 bg-white/80 backdrop-blur-xl transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Branding */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-surface-200/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-white font-bold text-sm shrink-0">
            A
          </div>
          {!collapsed && (
            <span className="font-semibold text-surface-900 text-sm">
              A<span className="text-brand-500">L</span>TEN Prospect
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                    : "text-surface-600 hover:bg-surface-50 hover:translate-x-1"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-surface-200/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-semibold text-sm shrink-0">
              E
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-surface-900 truncate">Elias</p>
                <p className="text-xs text-surface-400 truncate">Business Manager</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-surface-200 shadow-sm flex items-center justify-center hover:bg-surface-50 transition-colors"
        >
          <ChevronLeft
            className={clsx("w-3.5 h-3.5 text-surface-400 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-surface-200/50 flex">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={clsx(
                "flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors",
                active ? "text-brand-500" : "text-surface-400"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
