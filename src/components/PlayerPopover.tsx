import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Modal } from "./Modal";

interface PlayerPopoverProps {
  addPlayer: (name: string, level: string) => void;
}

export function PlayerPopover({ addPlayer }: PlayerPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [level, setLevel] = useState("0");

  const handleSubmit = () => {
    addPlayer(name, level);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-6" title="Add">
        <PlusIcon />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold">Add Player</h2>
        <form className="flex flex-col justify-center max-w-lg mx-auto px-4">
          <label className="mb-2 text-lg block">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
          <label className="mb-2 text-lg block">Level</label>
          <input
            type="number"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          />
          <button
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
            onClick={handleSubmit}
          >
            Add Player
          </button>
        </form>
      </Modal>
    </>
  );
}
