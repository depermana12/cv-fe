import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false, // Prevent excessive refetches
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors EXCEPT 401 (handled by axios interceptor)
        if (error instanceof Error && "status" in error) {
          const status = (error as any).status;
          if (status === 401) return true;
          if (status >= 400 && status < 500) return false;
        }
        // Alternatively, check axios response structure
        if ((error as any)?.response?.status) {
          const status = (error as any).response.status;
          if (status === 401) return true;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      gcTime: 1000 * 60 * 5,
      networkMode: "online", // Only fetch when online
    },
  },
});
