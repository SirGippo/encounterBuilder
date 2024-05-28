import { PlusIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Modal } from "./Modal";

type MonstersReturnType = {
  count: number;
  results: {
    index: string;
    name: string;
    url: string;
  }[];
};

interface MonsterPopoverProps {
  addMonster: (index: string, name: string, url: string) => void;
}

export function MonsterPopover({ addMonster }: MonsterPopoverProps) {
  const { data, status, refetch } = useQuery({
    queryKey: ["monsters"],
    queryFn: async (): Promise<MonstersReturnType> => {
      const response = await fetch("https://www.dnd5eapi.co/api/monsters");
      return response.json();
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddMonster = (index: string, name: string, url: string) => {
    addMonster(index, name, url);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-6" title="Add">
        <PlusIcon />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="h-[70vh] overflow-auto flex gap-4 flex-col">
          <h2 className="text-xl font-bold">Add Monster</h2>
          <input
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
          {status === "error" && (
            <button
              className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => refetch()}
            >
              Retry
            </button>
          )}
          {status !== "error" && (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white"></th>
                </tr>
              </thead>
              <tbody>
                {status === "pending" && <p>Loading...</p>}

                {status === "success" && (
                  <>
                    {data.results.map(({ index, name, url }) => {
                      if (
                        search === "" ||
                        name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return (
                          <tr key={index} className="even:bg-blue-50">
                            <td className="p-4 text-sm text-black">{name}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleAddMonster(index, name, url)
                                }
                                className="w-6"
                                title="Add"
                              >
                                <PlusIcon />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    </>
  );
}
