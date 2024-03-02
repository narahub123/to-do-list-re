import React, { useEffect, useRef, useState } from "react";

const MonthlyColumnHeader = ({ week, cards, columnWidth }) => {
  const sunday = week.sunday.split(".")[1] + "." + week.sunday.split(".")[2];
  return (
    <header className="column-header mb-3 flex items-center justify-between">
      <h3 className={`week font-medium text-${week.colColor}-300 `}>
        <span>{`W${week.week} `}</span>

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
