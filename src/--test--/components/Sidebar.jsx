import React, { createContext, useContext, useState } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import {
  BsCalendarMonth,
  BsCalendarWeek,
  BsCalendarDate,
  BsListCheck,
} from "react-icons/bs";

import { LuUserCircle } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();
const Sidebar = ({ children }) => {
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
      path: "/login",
      name: "login",
      icon: <LuUserCircle size={20} />,
    },
  ];
  return (
    <div className="flex">
      <aside className="h-screen">
        <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            {/* <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-44" : "w-0"
              }`}
              alt=""
            /> */}
            <span
              className={`overflow-hidden transition-all flex align-center items-center ${
                expanded ? "w-44  " : "w-0"
              }`}
            >
              <BsListCheck size={20} className="mr-2" />
              <span className="text-sm">To Do List</span>
            </span>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <LuChevronFirst size={20} />
              ) : (
                <LuChevronLast size={20} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="link">
                <SidebarItem icon={item.icon} text={item.name} />
              </NavLink>
            ))}
            <ul className="h-full"></ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 roundeed-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-44 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <FiMoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center justify-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 "
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-44 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
                        bg-indigo-100 text-indigo-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover: translate-x-0
            `}
        >
          {text}
        </div>
      )}
    </li>
  );
} // SidebarItem() ends
