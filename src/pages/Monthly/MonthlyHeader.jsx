import React from "react";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { MONTHS } from "../../data/MONTHS";

const MonthlyHeader = ({ month, setMonth }) => {
  const minusMonth = () => setMonth(month - 1);
  const plusMonth = () => setMonth(month + 1);

  return (
    <header className="header flex items-center pt-5 pl-12 pb-2">
      <span className="pt-0.5 mr-3" onClick={minusMonth}>
        <LuChevronLeftCircle />
      </span>
      <h1 className="month text-xl font-bold">{MONTHS[month]}</h1>
      <span className="pt-0.5 ml-3" onClick={plusMonth}>
        <LuChevronRightCircle />
      </span>
    </header>
  );
};

export default MonthlyHeader;
