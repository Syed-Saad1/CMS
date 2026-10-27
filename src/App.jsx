import React, { useState } from "react";
import Route from "./Route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            retry: 1,
            refetchOnReconnect: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Route />
    </QueryClientProvider>
  );
};
