import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

const TrashBin = ({ cards, setCards }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      {cards.length !== 0 ? (
        <div
          className={`trash-bin flex place-content-center 
                    w-full p-2 text-sm mt-1.5 rounded border
                    ${
                      active
                        ? "text-red-400 border-red-400 bg-red-400/50"
                        : "text-neutral-900  border-neutral-900 bg-neutral-50"
                    }
                  `}
        >
          {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
      ) : null}
    </>
  );
};

export default TrashBin;
