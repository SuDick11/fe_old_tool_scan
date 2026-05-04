import { useState, useCallback } from 'react';
import { scanApi } from '../api/scanApi';

export const useScan = () => {
  const [scanResults, setScanResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startScan = useCallback(async (url, depth = 'quick') => {
    setIsLoading(true);
    setError(null);

    const depthNum = depth === 'deep' ? 2 : 1;

    try {
      const data = await scanApi.scan(url, depthNum);
      setScanResults(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearScan = useCallback(() => {
    setScanResults(null);
    setError(null);
  }, []);

  return {
    scanResults,
    isLoading,
    error,
    startScan,
    clearScan,
  };
};
