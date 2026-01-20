import { QueryClient } from "@tanstack/react-query";

// https://tanstack.com/query/latest/docs/framework/react/guides/network-mode
// https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      gcTime: 0,
      retry: 1,
      networkMode: "always",
    },
    mutations: {
      retry: 0,
      networkMode: "always",
    },
  },
});
