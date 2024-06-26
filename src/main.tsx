import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AppQueryClientProvider } from "./providers/AppQueryClientProvider";
import { CartContextProvider } from "./providers/CartProvider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppQueryClientProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AppQueryClientProvider>
  </React.StrictMode>
);
