import React, { useContext } from "react";
import { SidebarContext } from "./Sidebar";

const SidebarItem = ({ icon, name, active }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`item relative flex items-center justify-center py-2 px-3 my-1 font=medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-200 text-indigo-600"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`name overflow-hidden transition-all ${
          expanded ? "w-48 ml-3" : "w-0"
        }`}
      >
        {name}
      </span>
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-3
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {name}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
