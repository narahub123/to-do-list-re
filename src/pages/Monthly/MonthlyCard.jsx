import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { LuCheckSquare, LuSquare } from "react-icons/lu";

const MonthlyCard = ({ id, subject, todos, start, end, column }) => {
  const [completedTodos, setCompletedTodos] = useState([]);

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    if (completedTodos.includes(index)) {
      setCompletedTodos(
        completedTodos.filter((todoIndex) => todoIndex !== index)
      );
    } else {
      setCompletedTodos([...completedTodos, index]);
    }
  };

  console.log(completedTodos);

  for (let completedTodo of completedTodos) {
    console.log(todos[completedTodo]);
  }

  return (
    <>
      <div
        className="card-container p-3 cursor-grab rounded border 
                 border-neutral-700 bg-neutral-50 
                   active:cursor-grabbing hover:border-neutral-500"
      >
        <div className="card-header flex items-center justify-between">
          <p className="subject text-base text-neutral-700">{subject}</p>
          <p className="control-icons flex gap-1 text-neutral-700">
            <FiEdit className="card-edit hover:text-neutral-500" />
            <FiTrash className="card-delete hover:text-neutral-500" />
          </p>
        </div>
        <p className="card-date border-b-2 text-right border-neutral-400 pl-0.5">
          <span className="start-date text-xs pr-0.5 text-neutral-500">
            {start}
          </span>
          <span className="text-xs text-neutral-500">~</span>
          <span className="end-date text-xs pl-0.5 text-neutral-500">
            {end}
          </span>
        </p>

        {todos.map((todo, index) => (
          <p
            key={index}
            className="card-todos flex items-center text-sm   text-neutral-700 mt-2"
            onClick={() => toggleTodoCompletion(index)}
          >
            {completedTodos.includes(index) ? <LuCheckSquare /> : <LuSquare />}
            <span
              className={`ml-1 ${
                completedTodos.includes(index) && "line-through"
              }`}
            >
              {todo.task}
            </span>
          </p>
        ))}
      </div>
    </>
  );
};

export default MonthlyCard;
