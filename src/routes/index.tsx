import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "../components/Card.tsx";
import { Products } from "../store.ts";

// What gets rendered at localhost:5173/
export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  // Tanstack Query calling the endpoint
  const { data, status, refetch } = useQuery({
    queryKey: ["store", "products"],
    queryFn: async (): Promise<Products> => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });

  return (
    <div className="p-10">
      {/* In case the endpoint fails, show a button with retry that tries the api call again */}
      {status === "error" && <button onClick={() => refetch()}>Retry</button>}

      {/* While the endpoint is loading, show a loading status */}
      {status === "pending" && <div>Loading...</div>}

      {/* When the endpoint is successful, show all the products in a grid */}
      {status === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {data.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}
