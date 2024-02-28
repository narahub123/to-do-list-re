import React from "react";

const MonthlyHeader = ({ month }) => {
  return (
    <header className="header pt-5 pl-12 pb-2">
      <h1 className="month text-xl font-bold">{month}</h1>
    </header>
  );
};

export default MonthlyHeader;
