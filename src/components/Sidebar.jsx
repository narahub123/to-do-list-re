import React, { createContext, useState } from "react";
import "../App.css";
import {
  BsCalendarMonth,
  BsCalendarWeek,
  BsCalendarDate,
  BsListCheck,
} from "react-icons/bs";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

import { NavLink, useLocation } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import SidebarItem from "./SidebarItem";

const SidebarContext = createContext();
const Sidebar = ({ children }) => {
  const location = useLocation();
  const [alert, setAlert] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const menuItem = [
    {
      path: "/",
      name: "monthly",
      icon: <BsCalendarMonth size={20} />,
    },
    {
      path: "/weekly",
      name: "weekly",
      icon: <BsCalendarWeek size={20} />,
    },
    {
      path: "/daily",
      name: "daily",
      icon: <BsCalendarDate size={20} />,
    },
    {
      path: "/settings",
      name: "settings",
      icon: <LuSettings size={20} />,
    },
  ];
  return (
    <div className="container flex">
      <aside className="sidebar bg-violet-300 h-screen">
        <menu className="menu h-full flex flex-col bg-white border-r shadow-sm">
          <section className="top-section p-4 pb-2 flex justify-between items-center">
            <div
              className={`logo flex align-center items-center overflow-hidden transition-all  ${
                expanded ? "w-44 ml-1" : "w-0"
              }`}
            >
              <BsListCheck size={20} className="mr-2" />
              <h1 className={`text-sm h-5`}>To Do List</h1>
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="toggle p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <LuChevronFirst size={20} />
              ) : (
                <LuChevronLast size={20} />
              )}
            </button>
          </section>

          <SidebarContext.Provider value={{ expanded }}>
            <nav className="h-full">
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <SidebarItem
                    icon={item.icon}
                    text={item.name}
                    active={location.pathname === item.path}
                    alert={alert}
                  />
                </NavLink>
              ))}
            </nav>
          </SidebarContext.Provider>

          <section className="bottom-section border-t flex p-3">
            <FaRegUser className="w-10 h-10" />
            <div
              className={`userinfo-container flex justify-between items-center overflow-hidden transition-all  ${
                expanded ? "w-44 ml-1" : "w-0"
              }`}
            >
              <div className="userinfo leading-4">
                <h4 className="username font-semibold">John Doe</h4>
                <span className="useremail text-xs text-gray-600">
                  johndoe@gmail.com
                </span>
              </div>
              <FiMoreVertical size={20} />
            </div>
          </section>
        </menu>
      </aside>
      <main className="board">{children}</main>
    </div>
  );
};

export default Sidebar;
export { SidebarContext };
