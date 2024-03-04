import React, { useEffect, useRef, useState } from "react";
import MonthlyColumnHeader from "./MonthlyColumnHeader";
import MonthlyCard from "./MonthlyCard";
import AddMonthlyCard from "./AddMonthlyCard";
import DropIndicator from "./DropIndicator";
import TrashBin from "./TrashBin";

const MonthlyColumn = ({ week, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const [columnWidth, setColumnWidth] = useState(0);
  const columnRef = useRef(null);
  // console.log(week.week);
  useEffect(() => {
    function handleResize() {
      if (columnRef.current) {
        const width = columnRef.current.offsetWidth;
        // console.log(width);
        setColumnWidth(width);
      }
    }

    handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(cards);
  // filter cards which match the condition
  const filteredCards = cards.filter((c) => c.column === column);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.subject);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    // console.log(indicators);
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };
  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }a
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`
    [data-column="${column}"]`)
    );
  };

  const handleDragLeave = (e) => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e) => {
    setActive(false);
    clearHighlights();
  };

  let colColor = "";
  if (week.colColor === "red") {
    colColor = "bg-red-800/20";
  } else if (week.colColor === "yellow") {
    colColor = "bg-yellow-800/20";
  } else if (week.colColor === "blue") {
    colColor = "bg-blue-800/20";
  } else if (week.colColor === "emerald") {
    colColor = "bg-emerald-800/20";
  } else if (week.colColor === "green") {
    colColor = "bg-green-800/20";
  } else if (week.colColor === "neutral") {
    colColor = "bg-neutral-800/20";
  }

  return (
    <section className="column" ref={columnRef}>
      <MonthlyColumnHeader
        week={week}
        cards={filteredCards}
        columnWidth={columnWidth}
      />
      <div
        onDrop={handleDragEnd}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={`column-body h-screen transition-colors ${
          active ? colColor : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <MonthlyCard
              key={c.id}
              colColor={week.colColor}
              {...c}
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator beforeId="-1" column={column} />
        <AddMonthlyCard
          key={week.week}
          column={column}
          setCards={setCards}
          week={week}
          columnWidth={columnWidth}
        />
        <TrashBin cards={filteredCards} setCards={setCards} />
      </div>
    </section>
  );
};

export default MonthlyColumn;
