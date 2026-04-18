import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-50 md:pl-64">
      <main className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
