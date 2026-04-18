import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0052A5] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-wider uppercase opacity-80">ALTEN</span>
            <h1 className="text-xl font-bold">Agent de Prospection Commerciale</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
