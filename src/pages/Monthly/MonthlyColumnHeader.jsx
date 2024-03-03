import React, { useEffect, useRef, useState } from "react";

const MonthlyColumnHeader = ({ week, cards, columnWidth }) => {
  const sunday = week.sunday.split(".")[1] + "." + week.sunday.split(".")[2];

  let colColor = "";
  if (week.colColor === "red") {
    colColor = "text-red-300";
  } else if (week.colColor === "yellow") {
    colColor = "text-yellow-300";
  } else if (week.colColor === "blue") {
    colColor = "text-blue-300";
  } else if (week.colColor === "emerald") {
    colColor = "text-emerald-300";
  } else if (week.colColor === "green") {
    colColor = "text-green-300";
  } else if (week.colColor === "neutral") {
    colColor = "text-neutral-300";
  }

  return (
    <header className="column-header mb-3 flex items-center justify-between">
      <h3 className={`week font-medium ${colColor} `}>
        <span>{`W${week.weekNum} `}</span>

        {columnWidth >= 200 && (
          <span className="weekdays">{`(${week.monday} - ${sunday})`}</span>
        )}
      </h3>
      <span className="monthly-goal-num rounded text-sm text-neutral-400">
        {cards.length}
      </span>
    </header>
  );
};

export default MonthlyColumnHeader;
