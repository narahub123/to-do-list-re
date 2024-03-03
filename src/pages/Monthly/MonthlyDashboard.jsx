import React, { useState } from "react";

import MonthlyHeader from "./MonthlyHeader";
import MonthlyColumn from "./MonthlyColumn";
import { weeksInMonth } from "../../util/weekInMonth";

const MonthlyDashboard = () => {
  const today = new Date();

  const thisMonth = today.getMonth();
  const [month, setMonth] = useState(thisMonth);
  const [cards, setCards] = useState([]);

  let colNum = weeksInMonth.length;
  const dynamicColumn = (colNum = 5
    ? "grid-cols-5"
    : (colNum = 6 ? "grid-cols-6" : "grid-cols-7"));
  // console.log(weeksInMonth.length);

  return (
    <>
      <MonthlyHeader month={month} setMonth={setMonth} />
      <main
        className={`monthly-dashboard p-12 pt-2 grid ${dynamicColumn} gap-3`}
      >
        {weeksInMonth.map((week) => (
          <MonthlyColumn week={week} key={week.week} cards={cards} />
        ))}
      </main>
    </>
  );
};

export default MonthlyDashboard;
