import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Creating the base of our application
export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navbar */}
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/cart" className="[&.active]:font-bold">
          Cart
        </Link>
      </div>
      <hr />

      {/* Component where children will be rendered depending on which route you are on */}
      <Outlet />

      {/* Dev tools */}
      <TanStackRouterDevtools />
    </>
  ),

  // Page not found component
  notFoundComponent: () => (
    <>
      <div>404 Not found</div>
      <a href="/">Back to home</a>
    </>
  ),
});
