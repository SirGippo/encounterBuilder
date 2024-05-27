import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type MonstersReturnType = {
  count: number;
  results: {
    index: string;
    name: string;
    url: string;
  }[];
};

export const Route = createFileRoute("/")({
  component: () => {
    const monsters = useQuery({
      queryKey: ["monsters"],
      queryFn: async (): Promise<MonstersReturnType> => {
        const response = await fetch("https://www.dnd5eapi.co/api/monsters");
        return response.json();
      },
    });

    const { data, status, refetch } = monsters;

    console.log(status, data);

    return (
      <>
        <div>Hello /!</div>
        {status === "error" && (
          <>
            <div>Error!</div>
            <button onClick={() => refetch()}>Retry</button>
          </>
        )}

        {status === "pending" && <div>Loading...</div>}

        {status === "success" && (
          <div>
            There are {data.count} monsters
            {data.results.map((monster) => (
              <div>{monster.name}</div>
            ))}
          </div>
        )}
      </>
    );
  },
});
