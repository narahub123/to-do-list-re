import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const MonthlyCard = ({ id, subject, todos, start, end, column }) => {
  return (
    <>
      <div
        className="card-container p-3 cursor-grab rounded border 
                 border-neutral-700 bg-neutral-800 
                   active:cursor-grabbing hover:border-neutral-500"
      >
        <div className="card-header flex items-center justify-between">
          <p className="subject text-base text-neutral-700">{subject}</p>
          <p className="control-icons flex gap-1 text-neutral-700">
            <FiEdit className="card-edit hover:text-neutral-500" />
            <FiTrash className="card-delete hover:text-neutral-500" />
          </p>
        </div>
        <p className="card-date border-b-2 border-neutral-700 pl-0.5">
          <span className="start-date text-xs text-neutral-500">{start}</span>
          <span className="text-xs text-neutral-500">&nbsp;~&nbsp;</span>
          <span className="end-date text-xs text-neutral-500">{end}</span>
        </p>
        <p className="card-todos text-sm text-neutral-700 mt-2">+ {todos}</p>
      </div>
    </>
  );
};

export default MonthlyCard;
