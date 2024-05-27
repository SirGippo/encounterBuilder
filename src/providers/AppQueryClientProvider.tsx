import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "@tanstack/react-router";

// Create a client
const queryClient = new QueryClient();

export function AppQueryClientProvider({ children }: { children: ReactNode }) {
  // Provide the client to your App
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
