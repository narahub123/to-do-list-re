import React, { useEffect } from "react";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import { MONTHS } from "../../data/MONTHS";

const MonthlyHeader = ({ year, setYear, month, setMonth }) => {
  const minusMonth = () => {
    setYear(month - 1 < 0 ? year - 1 : year);
    setMonth(month - 1 < 0 ? 11 : month - 1);
  };
  const plusMonth = () => {
    setYear(month + 1 > 11 ? year + 1 : year);
    setMonth(month + 1 > 11 ? 0 : month + 1);
  };

  return (
    <header className="header flex items-center pt-5 pl-12 pb-2 text-xl">
      <span className=" pt-0.5 mr-3" onClick={minusMonth}>
        <LuChevronLeftCircle />
      </span>
      <h1 className="month w-30 justify-center font-bold">{`${MONTHS[month]} ${year}`}</h1>
      <span className="pt-0.5 ml-3" onClick={plusMonth}>
        <LuChevronRightCircle />
      </span>
    </header>
  );
};

export default MonthlyHeader;
