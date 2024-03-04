import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const TrashBin = ({ cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e) => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    // console.log(cardId);
    setCards((pv) => pv.filter((c) => c.subject !== cardId));
    setActive(false);
  };
  return (
    <>
      {cards.length !== 0 ? (
        <motion.div
          layout
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
        </motion.div>
      ) : null}
    </>
  );
};

export default TrashBin;
