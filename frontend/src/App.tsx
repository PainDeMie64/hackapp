import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { SearchForm } from "./components/SearchForm";
import { LoadingView } from "./components/LoadingView";
import { StatusBar } from "./components/StatusBar";
import { ProspectTable } from "./components/ProspectTable";
import { ReportView } from "./components/ReportView";
import { useSearchStream } from "./hooks/useSearchStream";
import { startSearch } from "./api";
import type { SearchRequest } from "./types";

type Page = "home" | "search" | "history" | "reports";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { prospects, status, sheetUrl, isComplete, error, prospectsFound, totalRequested } =
    useSearchStream(searchId);

  const handleSearch = async (request: SearchRequest) => {
    setIsLoading(true);
    try {
      const result = await startSearch(request);
      setSearchId(result.search_id);
    } catch {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchId(null);
    setIsLoading(false);
    setPage("search");
  };

  const handleNavigate = (p: Page) => {
    if (p !== "search") {
      setSearchId(null);
      setIsLoading(false);
    }
    setPage(p);
  };

  const isSearching = searchId !== null && !isComplete && prospects.length === 0 && !error;
  const hasResults = searchId !== null && (prospects.length > 0 || isComplete);

  return (
    <>
      <Sidebar currentPage={hasResults ? "search" : page} onNavigate={handleNavigate} />
      <Layout>
        {/* Dashboard */}
        {page === "home" && !searchId && <Dashboard onNavigate={handleNavigate} />}

        {/* Search form */}
        {page === "search" && !searchId && (
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
        )}

        {/* Loading animation */}
        {isSearching && (
          <LoadingView
            status={status}
            prospectsFound={prospectsFound}
            totalRequested={totalRequested}
          />
        )}

        {/* Results */}
        {hasResults && (
          <div className="space-y-6">
            {/* Back link + count */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-brand-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Nouvelle recherche
              </button>
              {isComplete && (
                <span className="text-sm text-surface-400">{prospects.length} résultat{prospects.length > 1 ? "s" : ""}</span>
              )}
            </div>

            <StatusBar prospects={prospects} sheetUrl={sheetUrl} isComplete={isComplete} />

            {!isComplete && status && (
              <div className="flex items-center gap-3 bg-brand-50 rounded-xl px-4 py-3">
                <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-brand-700 font-medium">{status}</span>
                <span className="text-xs text-brand-500 ml-auto">{prospectsFound}/{totalRequested}</span>
              </div>
            )}

            {error && (
              <div className="bg-score-low-bg border border-score-low/20 rounded-xl px-4 py-3">
                <p className="text-sm text-score-low font-medium">{error}</p>
              </div>
            )}

            <ProspectTable prospects={prospects} />

            <ReportView searchId={searchId!} isComplete={isComplete} />
          </div>
        )}

        {/* History placeholder */}
        {page === "history" && !searchId && (
          <div className="animate-entrance">
            <h1 className="text-2xl font-bold text-surface-900 mb-6">Historique des Recherches</h1>
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8 text-center">
              <p className="text-surface-400">Aucune recherche passée pour le moment.</p>
              <button
                onClick={() => setPage("search")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                Lancer une recherche
              </button>
            </div>
          </div>
        )}

        {/* Reports placeholder */}
        {page === "reports" && !searchId && (
          <div className="animate-entrance">
            <h1 className="text-2xl font-bold text-surface-900 mb-6">Rapports</h1>
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8 text-center">
              <p className="text-surface-400">Les rapports seront disponibles après une recherche de prospects.</p>
              <button
                onClick={() => setPage("search")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                Lancer une recherche
              </button>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
