import React, { useState } from "react";
import MonthlyColumnHeader from "./MonthlyColumnHeader";

const MonthlyColumn = ({ week, column, cards, setCards }) => {
  const [active, setActive] = useState(true);

  return (
    <section className="column">
      <MonthlyColumnHeader week={week} cards={cards} />
      {/* <div
        className={`h-full transition-colors ${
          active ? "bg-" + week.colColor + "-800/50" : "bg-neutral-800/0"
        }`}
      ></div> */}
    </section>
  );
};

export default MonthlyColumn;
