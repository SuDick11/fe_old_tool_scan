const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const scanApi = {
  scan: async (url, depth = 1) => {
    const response = await fetch(`${BACKEND_URL}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, depth }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Scan failed (${response.status})`);
    }

    return response.json();
  },

  health: async () => {
    const response = await fetch(`${BACKEND_URL}/health`);
    if (!response.ok) throw new Error(`Health check failed (${response.status})`);
    return response.json();
  },
};
