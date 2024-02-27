import React, { createContext } from "react";
import {
  BsCalendarMonth,
  BsCalendarWeek,
  BsCalendarDate,
  BsListCheck,
} from "react-icons/bs";
import { LuChevronFirst } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "monthly",
      icon: <BsCalendarMonth />,
    },
    {
      path: "/weekly",
      name: "weekly",
      icon: <BsCalendarWeek />,
    },
    {
      path: "/daily",
      name: "daily",
      icon: <BsCalendarDate />,
    },
    {
      path: "/settings",
      name: "settings",
      icon: <LuSettings />,
    },
  ];
  return (
    <div className="container flex">
      <aside className="sidebar bg-violet-300 h-screen">
        <menu className="menu h-full flex flex-col bg-white border-r shadow-sm">
          <section className="top-section p-4 pb-2 flex justify-between items-center">
            <div className="logo flex align-center items-center">
              <BsListCheck size={20} className="mr-2" />
              <h1 className="text-sm">To Do List</h1>
            </div>
            <button className="toggle p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              <LuChevronFirst size={20} />
            </button>
          </section>

          <nav>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassname="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            ))}
            <div className="h-full" />
          </nav>

          <section className="bottom-section border-t flex p-3">
            <FaRegUser className="w-10 h-10 rounded-md" />
            <div className="userinfo-container flex justify-between items-center">
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
