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

  getWeeksInMonth(controlYear, controlMonth, controlDate);

  const [year, setYear] = useState(controlYear);
  const [month, setMonth] = useState(controlMonth);
  const [date, setDate] = useState(controlDate);

  console.log(year);
  console.log(month);
  console.log(date);
  const [cards, setCards] = useState([]);

  const filteredWeeksInMonth = getWeeksInMonth(year, month, date);

  console.log(filteredWeeksInMonth);

  let colNum = filteredWeeksInMonth.length;
  // console.log(colNum);
  let dynamicColumn = "grid-cols-5";
  if (colNum === 6) {
    dynamicColumn = "grid-cols-6";
  } else if (colNum === 7) {
    dynamicColumn = "grid-cols-7";
  }

  return (
    <>
      <MonthlyHeader
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <main
        className={`monthly-dashboard p-12 pt-2 grid ${dynamicColumn} gap-3`}
      >
        {filteredWeeksInMonth.map((week) => (
          <MonthlyColumn
            week={week}
            key={week.weekNum}
            cards={cards}
            setCards={setCards}
          />
        ))}
      </main>
    </>
  );
};

export default MonthlyDashboard;
