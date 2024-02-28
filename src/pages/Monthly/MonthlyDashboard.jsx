import React, { useState } from "react";
import MonthlyHeader from "./MonthlyHeader";
import { MONTHS } from "../../data/MONTHS";

const MonthlyDashboard = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const [month, setMonth] = useState(MONTHS[thisMonth]);

  console.log(MONTHS[month]);

  return (
    <>
      <MonthlyHeader month={month} />
    </>
  );
};

export default MonthlyDashboard;
