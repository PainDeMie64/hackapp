import { useState } from "react";
import { Layout } from "./components/Layout";
import { SearchForm } from "./components/SearchForm";
import { StatusBar } from "./components/StatusBar";
import { ProspectTable } from "./components/ProspectTable";
import { ReportView } from "./components/ReportView";
import { useSearchStream } from "./hooks/useSearchStream";
import { startSearch } from "./api";
import type { SearchRequest } from "./types";

function App() {
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
  };

  return (
    <Layout>
      <div className="space-y-6">
        {!searchId && <SearchForm onSubmit={handleSearch} isLoading={isLoading} />}

        {searchId && (
          <>
            <StatusBar
              status={status}
              prospectsFound={prospectsFound}
              totalRequested={totalRequested}
              isComplete={isComplete}
              error={error}
              sheetUrl={sheetUrl}
            />

            <ProspectTable prospects={prospects} />

            <ReportView searchId={searchId} isComplete={isComplete} />

            {isComplete && (
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Nouvelle recherche
              </button>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;
