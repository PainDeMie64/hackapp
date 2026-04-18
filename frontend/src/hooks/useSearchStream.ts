import { useState, useEffect, useCallback } from "react";
import type { Prospect } from "../types";

interface StreamState {
  prospects: Prospect[];
  status: string;
  sheetUrl: string | null;
  isComplete: boolean;
  error: string | null;
  prospectsFound: number;
  totalRequested: number;
}

export function useSearchStream(searchId: string | null): StreamState {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [status, setStatus] = useState("");
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prospectsFound, setProspectsFound] = useState(0);
  const [totalRequested, setTotalRequested] = useState(0);

  const reset = useCallback(() => {
    setProspects([]);
    setStatus("");
    setSheetUrl(null);
    setIsComplete(false);
    setError(null);
    setProspectsFound(0);
    setTotalRequested(0);
  }, []);

  useEffect(() => {
    if (!searchId) {
      reset();
      return;
    }
    reset();

    const eventSource = new EventSource(`/api/search/${searchId}/stream`);

    eventSource.addEventListener("status", (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.message);
      if (data.prospects_found !== undefined) setProspectsFound(data.prospects_found);
      if (data.total_requested !== undefined) setTotalRequested(data.total_requested);
    });

    eventSource.addEventListener("prospect", (e) => {
      const prospect: Prospect = JSON.parse(e.data);
      setProspects((prev) => [...prev, prospect]);
      setProspectsFound((prev) => prev + 1);
    });

    eventSource.addEventListener("sheet_update", (e) => {
      const data = JSON.parse(e.data);
      setSheetUrl(data.url);
    });

    eventSource.addEventListener("complete", () => {
      setIsComplete(true);
      eventSource.close();
    });

    eventSource.addEventListener("error", (e) => {
      if (e instanceof MessageEvent) {
        const data = JSON.parse(e.data);
        setError(data.message);
      }
      eventSource.close();
    });

    return () => eventSource.close();
  }, [searchId, reset]);

  return { prospects, status, sheetUrl, isComplete, error, prospectsFound, totalRequested };
}
