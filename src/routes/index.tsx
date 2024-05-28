import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MonsterPopover } from "../components/MonsterPopover";
import { PlayerPopover } from "../components/PlayerPopover";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [players, setPlayers] = useState([
    { id: uuidv4(), name: "Player1", level: 1 },
  ]);
  const [monsters, setMonsters] = useState([
    {
      index: "goblin",
      name: "Goblin",
      url: "/api/monsters/goblin",
      count: 1,
    },
  ]);

  const handleAddPlayer = (name: string, level: string) => {
    const levelAsNumber = isNaN(Number(level)) ? 1 : Number(level);
    setPlayers((players) => [
      ...players,
      { name, level: levelAsNumber, id: uuidv4() },
    ]);
  };

  const handleAddMonster = (index: string, name: string, url: string) => {
    const alreadyAddedMonster = monsters.find(
      (monster) => monster.index === index
    );
    if (alreadyAddedMonster === undefined) {
      setMonsters((monsters) => [...monsters, { index, name, url, count: 1 }]);
    } else {
      setMonsters((monsters) => {
        return monsters.map((monster) =>
          monster.index === index
            ? { ...monster, count: monster.count + 1 }
            : monster
        );
      });
    }
  };

  const handleAddCount = (index: string) => {
    setMonsters((monsters) => {
      return monsters.map((monster) =>
        monster.index === index
          ? { ...monster, count: monster.count + 1 }
          : monster
      );
    });
  };

  return (
    <div className="flex flex-col gap-10 p-8 justify-center grow-0">
      <h1 className="text-2xl w-fit mx-auto">Encounter Builder</h1>

      <table className="table-auto bg-white mx-auto">
        <tbody className="whitespace-nowrap">
          {players.map(({ id, name, level }) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="p-4 text-[15px] w-1/2 text-gray-800">{name}</td>
              <td className="p-4 text-[15px] w-1/4 text-gray-800">{level}</td>
              <td className="p-4 w-1/4">
                <button
                  className="mx-auto w-6"
                  title="Delete"
                  onClick={() =>
                    setPlayers((players) =>
                      players.filter((player) => player.id !== id)
                    )
                  }
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
          <tr className="hover:bg-gray-50">
            <td colSpan={3} className="text-center">
              <PlayerPopover addPlayer={handleAddPlayer} />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-auto bg-white mx-auto">
        <tbody className="whitespace-nowrap">
          {monsters.map(({ index: monsterIndex, name, count }, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-4 text-[15px] w-2/4 text-gray-800">{name}</td>
              <td className="p-4 text-[15px] w-1/4 text-gray-800">{count}</td>
              <td className="p-4 w-1/4">
                <button
                  className="mx-auto w-6"
                  title="Add"
                  onClick={() => handleAddCount(monsterIndex)}
                >
                  <PlusIcon />
                </button>
                <button
                  className="mx-auto w-6"
                  title="Delete"
                  onClick={() =>
                    setMonsters((monsters) =>
                      monsters.filter(
                        (monster) => monster.index !== monsterIndex
                      )
                    )
                  }
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
          <tr className="hover:bg-gray-50">
            <td colSpan={3} className="text-center">
              <MonsterPopover addMonster={handleAddMonster} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
