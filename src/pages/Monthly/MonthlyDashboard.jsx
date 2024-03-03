import React, { useState } from "react";

import MonthlyHeader from "./MonthlyHeader";
import MonthlyColumn from "./MonthlyColumn";
// import { weeksInMonth } from "../../util/weekInMonth";
import { getWeeksInMonth } from "../../util/getWeeksInMonth";

const MonthlyDashboard = () => {
  const today = new Date();

  const controlYear = today.getFullYear();
  const controlMonth = today.getMonth();
  const controlDate = today.getDate();

  let weeksInMonth = getWeeksInMonth(controlYear, controlMonth, controlDate);

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
