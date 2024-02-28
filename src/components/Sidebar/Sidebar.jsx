import React from "react";
import {
  BsListCheck,
  BsPerson,
  BsCalendarMonth,
  BsCalendarWeek,
  BsCalendarDate,
} from "react-icons/bs";
import { LuChevronFirst, LuSettings } from "react-icons/lu";

import { FiMoreVertical } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
      <aside className="sidebar h-screen">
        <menu className="sidebar-menu h-full flex flex-col bg--white border-r shadow-sm">
          <section className="top-section p-4 pb-2 flex justify-between items-center">
            <div className={`head flex jurify-center itemcenter `}>
              <BsListCheck className="logo mt-1.5" size={20} />
              <h1 className="title text-xl h-7 w-40 ml-3"> To Do List</h1>
            </div>
            <button className="toggle p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              <LuChevronFirst className="toggle-button" size={20} />
            </button>
          </section>

          <nav className="menus h-full">
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="item-link">
                <SidebarItem icon={item.icon} name={item.name} />
              </NavLink>
            ))}
          </nav>

          <section className="botton-section border-t p-3 flex ">
            <BsPerson className="user-icon w-10 h-10" />
            <div className="user-info-container flex justify-between items-center w-44 ml-3">
              <div className="user-info leading-4">
                <h4 className="username font-semibold">John Doe</h4>
                <span className="useremail text-xs text-gray-600">
                  johndoe@gamil.com
                </span>
              </div>
              <FiMoreVertical size={20} className="ml-2" />
            </div>
          </section>
        </menu>
      </aside>
      <main className="kanban"></main>
    </div>
  );
};

export default Sidebar;
