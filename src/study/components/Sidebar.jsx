import React, { useState } from "react";
import "../App.css";
import {
  BsFillCalendar2MonthFill,
  BsFillCalendar2WeekFill,
  BsFillCalendar2DayFill,
} from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
    <div className="container flex">
      <div
        className={`sidebar transition-colors bg-neutral-950 text-neutral-50 h-screen  ${
          isOpen ? "w-72" : "w-12"
        }`}
      >
        <div className={`flex items-center px-3.5 py-4 `}>
          <h1 className={`logo text-3xl ${isOpen ? "block" : "hidden"}`}>
            Logo
          </h1>
          <div className={`flex text-xl   ${isOpen ? "ml-32 " : "ml-0 py-2"}`}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={`link flex items-center gap-4 text-neutral-50 px-3 py-4 transition-colors duration-500 hover:bg-blue-300 hover:text-neutral-950 hover:transition-colors}`}
          >
            <div className="icon text-xl ">{item.icon}</div>
            <div className={`text-xl ${isOpen ? "block" : "hidden"}`}>
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="w-full p-5">{children}</main>
    </div>
  );
};

export default Sidebar;
