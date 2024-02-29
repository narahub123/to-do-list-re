import React, { useEffect, useRef, useState } from "react";

const MonthlyColumnHeader = ({ week, cards }) => {
  const [columnWidth, setColumnWidth] = useState(0);
  const columnRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (columnRef.current) {
        const width = columnRef.current.offsetWidth;
        setColumnWidth(width);
      }
    }

    handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className="column-header mb-3 flex items-center justify-between"
      ref={columnRef}
    >
      <h3 className={`week font-medium text-${week.colColor}-300 `}>
        <span>{`W${week.week} `}</span>

        {columnWidth >= 200 && (
          <span className="weekdays">{`(${week.monday} - ${week.sunday})`}</span>
        )}
      </h3>
      <span className="monthly-goal-num rounded text-sm text-neutral-400">
        {cards.length}
      </span>
    </header>
  );
};

export default MonthlyColumnHeader;
