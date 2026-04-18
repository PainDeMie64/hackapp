interface Props {
  status: string;
  prospectsFound: number;
  totalRequested: number;
  isComplete: boolean;
  error: string | null;
  sheetUrl: string | null;
}

export function StatusBar({ status, prospectsFound, totalRequested, isComplete, error, sheetUrl }: Props) {
  if (!status && !error) return null;

  const progress = totalRequested > 0 ? Math.round((prospectsFound / totalRequested) * 100) : 0;

  return (
    <div className={`rounded-xl border p-4 ${
      error ? "bg-red-50 border-red-200" : isComplete ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {!isComplete && !error && (
            <div className="w-4 h-4 border-2 border-[#0052A5] border-t-transparent rounded-full animate-spin" />
          )}
          {isComplete && <span className="text-green-600 font-bold text-lg">&#10003;</span>}
          {error && <span className="text-red-600 font-bold text-lg">&#10007;</span>}
          <span className={`text-sm font-medium ${
            error ? "text-red-700" : isComplete ? "text-green-700" : "text-blue-700"
          }`}>
            {error || status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {sheetUrl && (
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#0052A5] hover:underline"
            >
              Ouvrir Google Sheet
            </a>
          )}
          <span className="text-xs font-semibold text-gray-600">
            {prospectsFound}/{totalRequested} prospects
          </span>
        </div>
      </div>
      {!isComplete && !error && totalRequested > 0 && (
        <div className="w-full bg-blue-100 rounded-full h-2">
          <div
            className="bg-[#0052A5] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
