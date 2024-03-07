import React, { useEffect, useRef, useState } from "react";
import MonthlyColumnHeader from "./MonthlyColumnHeader";
import MonthlyCard from "./MonthlyCard";
import AddMonthlyCard from "./AddMonthlyCard";
import DropIndicator from "./DropIndicator";
import TrashBin from "./TrashBin";
import MonthlyWarningModal from "./Modal/MonthlyWarningModal";
import { updateMonthlyToDo } from "../../util/HandleAPI";

const MonthlyColumn = ({ week, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const [columnWidth, setColumnWidth] = useState(0);

  const columnRef = useRef(null);

  const [createdAt, setCreatedAt] = useState();

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

  // filter cards which match the condition
  const filteredCards = cards.filter((c) => c.data.column === column);

  // console.log(filteredCards);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);

    setWarning(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
    setWarning(true);
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
      }
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

  // console.log(warning);

  const handleDragEnd = (e) => {
    setActive(false);
    clearHighlights();

    // get id of dragged card
    const cardId = e.dataTransfer.getData("cardId");
    console.log(cardId);

    // gete all indicators
    const indicators = getIndicators();

    // find a nearest indicator
    const { element } = getNearestIndicator(e, indicators);

    // set before either indicator's before or -1
    const before = element.dataset.before || "-1";
    console.log("before", before);
    const after = element.dataset.after || "-1";
    console.log("after", after);

    // if before is not equal to cardId which means if the card moves to other position
    if (before !== cardId) {
      // copy all the cards
      let copy = [...cards];
      console.log(copy);

      // find a card which is the same card dragged among the copy cards
      let cardToTransfer = copy.find((c) => c.id === cardId);
      console.log("current card: ", cardToTransfer);

      let start = cardToTransfer.data.start;
      let end = cardToTransfer.data.end;

      // if the card moves to a different column
      if (cardToTransfer.data.column !== column) {
        console.log("different column");

        start = new Date(week.monday);
        end = new Date(week.sunday);
      }

      // if there is no card matched to the dragged card
      if (!cardToTransfer) return;

      // update the dragged card property
      cardToTransfer = {
        ...cardToTransfer,
        data: { ...cardToTransfer.data, column, start, end },
      };
      // console.log("current modified: ", cardToTransfer);

      // filter copy cards which is not dragged
      copy = copy.filter((c) => c.id !== cardId);

      // if before = -1 which means moving to the bottom on the column
      const moveToBack = before === "-1";

      // if dragged card moves to the bottom
      if (moveToBack) {
        // add dragged card to copy cards array at the end
        copy.push(cardToTransfer);
        console.log(cardToTransfer);
        updateMonthlyToDo(
          {
            id: cardToTransfer.id,
            data: cardToTransfer.data,
            createdAt: Date.now(),
          },
          cards,
          setCards
        );
      } else {
        // add dragged card to copy cards among the array
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        console.log(insertAtIndex);
        if (insertAtIndex === undefined) return;

        updateMonthlyToDo(
          {
            id: cardToTransfer.id,
            data: cardToTransfer.data,
            createdAt: Date.now(),
          },
          cards,
          setCards
        );

        const afterAtIndex = copy.filter(
          (c, index) => index >= insertAtIndex && c.data.column === column
        );

        console.log(afterAtIndex);
        for (let after of afterAtIndex) {
          console.log(after);
          updateMonthlyToDo(
            {
              id: after.id,
              data: after.data,
              createdAt: Date.now(),
            },
            cards,
            setCards
          );
        }
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      console.log(before);

      setCards(copy);
    }
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
    <>
      <section className="column" ref={columnRef}>
        <MonthlyColumnHeader
          week={week}
          cards={filteredCards}
          columnWidth={columnWidth}
        />
        <div
          onDrop={(e) => handleDragEnd(e)}
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
                createdAt={createdAt}
                setCreatedAt={setCreatedAt}
                handleDragStart={handleDragStart}
                cards={cards}
                setCards={setCards}
              />
            );
          })}
          <DropIndicator beforeId="-1" afterId={null} column={column} />
          <AddMonthlyCard
            key={week.week}
            column={column}
            cards={cards}
            setCards={setCards}
            week={week}
            columnWidth={columnWidth}
          />
          <TrashBin cards={filteredCards} setCards={setCards} />
        </div>
      </section>
    </>
  );
};

export default MonthlyColumn;
