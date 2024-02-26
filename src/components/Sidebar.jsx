import React from "react";
import {
  BsFillCalendar2MonthFill,
  BsFillCalendar2WeekFill,
  BsFillCalendar2DayFill,
} from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "monthly",
      icon: <BsFillCalendar2MonthFill />,
    },
    {
      path: "/weekly",
      name: "weekly",
      icon: <BsFillCalendar2WeekFill />,
    },
    {
      path: "/daily",
      name: "daily",
      icon: <BsFillCalendar2DayFill />,
    },
    {
      path: "/login",
      name: "login",
      icon: <RiLoginCircleLine />,
    },
  ];
  return (
    <div>
      <h1>this is sidebar</h1>
    </div>
  );
};

export default Sidebar;
