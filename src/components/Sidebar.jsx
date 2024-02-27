import React from "react";
import {
  BsCalendarMonth,
  BsCalendarWeek,
  BsCalendarDate,
  BsListCheck,
} from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "monthly",
      icon: <BsCalendarMonth />,
    },
    {
      path: "/",
      name: "monthly",
      icon: <BsCalendarWeek />,
    },
    {
      path: "/",
      name: "monthly",
      icon: <BsCalendarDate />,
    },
    {
      path: "/",
      name: "monthly",
      icon: <LuSettings />,
    },
  ];
  return (
    <div>
      <h1>sidebar</h1>
    </div>
  );
};

export default Sidebar;
