import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type Products } from "../store.ts";
import { Card } from "../components/Card.tsx";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data, status, refetch } = useQuery({
    queryKey: ["store", "products"],
    queryFn: async (): Promise<Products> => {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    },
  });

  return (
    <div className="p-10">
      {status === "error" && <button onClick={() => refetch()}>Retry</button>}

      {status === "pending" && <div>Loading...</div>}

      {status === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {data.map((product) => {
            return <Card product={product} />;
          })}
        </div>
      )}
    </div>
  );
}
