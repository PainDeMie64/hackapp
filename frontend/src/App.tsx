import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { SearchForm } from "./components/SearchForm";
import { LoadingView } from "./components/LoadingView";
import { StatusBar } from "./components/StatusBar";
import { ProspectTable } from "./components/ProspectTable";
import { ProspectDetail } from "./components/ProspectDetail";
import { ReportView } from "./components/ReportView";
import { HistoryView } from "./components/HistoryView";
import { ReportsPage } from "./components/ReportsPage";
import { useSearchStream } from "./hooks/useSearchStream";
import { startSearch, fetchSearchDetail } from "./api";
import type { SearchRequest, Prospect } from "./types";

type Page = "home" | "search" | "history" | "reports";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [historyProspects, setHistoryProspects] = useState<Prospect[] | null>(null);
  const [historySheetUrl, setHistorySheetUrl] = useState<string | null>(null);
  const [historyReport, setHistoryReport] = useState<string | null>(null);
  const [selectedProspectIdx, setSelectedProspectIdx] = useState<number | null>(null);

  const { prospects: streamProspects, status, sheetUrl: streamSheetUrl, isComplete, error, prospectsFound, totalRequested } =
    useSearchStream(searchId);

  const isViewingHistory = historyProspects !== null;
  const prospects = isViewingHistory ? historyProspects : streamProspects;
  const sheetUrl = isViewingHistory ? historySheetUrl : streamSheetUrl;

  const handleSearch = async (request: SearchRequest) => {
    setIsLoading(true);
    setHistoryProspects(null);
    setSelectedProspectIdx(null);
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
    setHistoryProspects(null);
    setHistorySheetUrl(null);
    setHistoryReport(null);
    setSelectedProspectIdx(null);
    setPage("search");
  };

  const handleNavigate = (p: Page) => {
    setSearchId(null);
    setIsLoading(false);
    setHistoryProspects(null);
    setHistorySheetUrl(null);
    setHistoryReport(null);
    setSelectedProspectIdx(null);
    setPage(p);
  };

  const handleViewHistoryResult = async (id: string) => {
    try {
      const data = await fetchSearchDetail(id);
      setSearchId(id);
      setHistoryProspects(data.prospects);
      setHistorySheetUrl(data.sheet_url);
      setHistoryReport(data.report);
      setSelectedProspectIdx(null);
      setPage("search");
    } catch { /* ignore */ }
  };

  const isSearching = searchId !== null && !isViewingHistory && !isComplete && streamProspects.length === 0 && !error;
  const hasResults = (searchId !== null && (prospects.length > 0 || isComplete)) || isViewingHistory;

  // Prospect detail view
  if (selectedProspectIdx !== null && prospects[selectedProspectIdx]) {
    return (
      <>
        <Sidebar currentPage="search" onNavigate={handleNavigate} />
        <Layout>
          <ProspectDetail
            prospect={prospects[selectedProspectIdx]}
            searchId={searchId!}
            onBack={() => setSelectedProspectIdx(null)}
          />
        </Layout>
      </>
    );
  }

  return (
    <>
      <Sidebar currentPage={hasResults ? "search" : page} onNavigate={handleNavigate} />
      <Layout>
        {page === "home" && !searchId && !isViewingHistory && <Dashboard onNavigate={handleNavigate} />}

        {page === "search" && !searchId && !isViewingHistory && (
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
        )}

        {isSearching && (
          <LoadingView status={status} prospectsFound={prospectsFound} totalRequested={totalRequested} />
        )}

        {hasResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button onClick={handleReset} className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-brand-500 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Nouvelle recherche
              </button>
              <span className="text-sm text-surface-400">{prospects.length} résultat{prospects.length > 1 ? "s" : ""}</span>
            </div>

            <StatusBar prospects={prospects} sheetUrl={sheetUrl} isComplete={isComplete || isViewingHistory} searchId={searchId} />

            {!isComplete && !isViewingHistory && status && (
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

            <ProspectTable prospects={prospects} onSelectProspect={setSelectedProspectIdx} />

            <ReportView searchId={searchId!} isComplete={isComplete || isViewingHistory} initialReport={historyReport} />
          </div>
        )}

        {page === "history" && !searchId && !isViewingHistory && (
          <HistoryView onViewResults={handleViewHistoryResult} onNewSearch={() => setPage("search")} />
        )}

        {page === "reports" && !searchId && !isViewingHistory && (
          <ReportsPage onNewSearch={() => setPage("search")} />
        )}
      </Layout>
    </>
  );
}

export default App;
