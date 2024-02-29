import React, { useState } from "react";
import { MONTHS } from "../../data/MONTHS";
import MonthlyHeader from "./MonthlyHeader";
import MonthlyColumn from "./MonthlyColumn";
// import DEFAULT_CARDS from "../../data/DEFAULT_CARDS";
import { weeksInMonth } from "../../util/weekInMonth";

const MonthlyDashboard = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const [month, setMonth] = useState(MONTHS[thisMonth]);

  const [cards, setCards] = useState([]);

  return (
    <>
      <MonthlyHeader month={month} />
      <main
        className={`monthly-dashboard p-12 pt-2 grid grid-cols-${weeksInMonth.length} gap-3`}
      >
        {weeksInMonth.map((week, index) => (
          <MonthlyColumn week={week} key={index} cards={cards} />
        ))}
      </main>
    </>
  );
};

export default MonthlyDashboard;
