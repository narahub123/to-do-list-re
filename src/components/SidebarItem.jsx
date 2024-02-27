import React from "react";

const SidebarItem = ({ icon, text }) => {
  return (
    <li
      className="relative flex items-center justify-center py-2 px-3 my-1 
                font-medium rounded-md cursor-pointer transition-colors group"
    >
      {icon}
      <span className="w-44 ml-3">{text}</span>
    </li>
  );
};

export default SidebarItem;
