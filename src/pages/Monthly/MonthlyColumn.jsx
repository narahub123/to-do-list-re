import React, { useEffect, useRef, useState } from "react";
import MonthlyColumnHeader from "./MonthlyColumnHeader";
import MonthlyCard from "./MonthlyCard";
import AddMonthlyCard from "./AddMonthlyCard";

const MonthlyColumn = ({ week, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const [columnWidth, setColumnWidth] = useState(0);
  const columnRef = useRef(null);
  // console.log(week.week);
  useEffect(() => {
    function handleResize() {
      if (columnRef.current) {
        const width = columnRef.current.offsetWidth;
        console.log(width);
        setColumnWidth(width);
      }
    }

    handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // filter cards which match the condition
  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <section className="column" ref={columnRef}>
      <MonthlyColumnHeader
        week={week}
        cards={filteredCards}
        columnWidth={columnWidth}
      />
      <div
        className={`column-body h-screen transition-colors ${
          active ? "bg-" + week.colColor + "-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <MonthlyCard key={c.id} {...c} />;
        })}
        <AddMonthlyCard
          key={week.week}
          column={column}
          setCards={setCards}
          week={week}
          columnWidth={columnWidth}
        />
      </div>
    </section>
  );
};

export default MonthlyColumn;
