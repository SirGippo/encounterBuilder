import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const SECOND = 1000;
const MINUTE = SECOND * 60;

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * MINUTE,
    },
  },
});

export function AppQueryClientProvider({ children }: { children: ReactNode }) {
  // Provide the client to your App
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
