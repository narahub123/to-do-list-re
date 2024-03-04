import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { LuCheckSquare, LuSquare } from "react-icons/lu";
import CircleProgressBar from "./CircleProgressBar";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";

const MonthlyCard = ({
  id,
  subject,
  todos,
  start,
  end,
  column,
  colColor,
  handleDragStart,
}) => {
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

  // console.log(completedTodos);

  // for (let completedTodo of completedTodos) {
  //   console.log(todos[completedTodo]);
  // }

  // console.log(colColor);
  let boardColor = "border-neutral-700 hover:border-neutral-300";

  if (colColor === "red") {
    boardColor =
      "border-red-500 hover:border-red-300 group-hover:border-red-300";
  } else if (colColor === "yellow") {
    boardColor =
      "border-yellow-500 hover:border-yellow-300 group-hover:border-yellow-300";
  } else if (colColor === "blue") {
    boardColor =
      "border-blue-500 hover:border-blue-300 group-hover:border-blue-300";
  } else if (colColor === "emerald") {
    boardColor =
      "border-emerald-500 hover:border-emerald-300 group-hover:border-emerald-300";
  } else if (colColor === "green") {
    boardColor =
      "border-green-500 hover:border-green-300 group-hover:border-green-300";
  } else if (colColor === "neutral") {
    boardColor =
      "border-red-500 hover:border-red-300 group-hover:border-neutral-300";
  }

  let todosSize = todos.length;
  let trueCount = 0;
  for (let todo of todos) {
    if (todo.completed === true) {
      trueCount++;
    }
  }
  let percentage = Math.floor((trueCount / todosSize) * 100);

  return (
    <>
      <DropIndicator beforeId={subject} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { id, subject, todos, start, end, column })
        }
        className={`card-container p-3 cursor-grab rounded border 
                  bg-neutral-50 ${boardColor}
                   active:cursor-grabbing group`}
      >
        <div className="card-header flex items-center justify-between">
          <p className="subject text-base text-neutral-700">{subject}</p>
          <p className="control-icons flex gap-1 text-neutral-700">
            <FiEdit className="card-edit hover:text-neutral-500" />
            <FiTrash className="card-delete hover:text-neutral-500" />
          </p>
        </div>
        <p className={`card-date border-b-2 text-right pl-0.5 ${boardColor}`}>
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
        <p className="flex justify-center">
          <CircleProgressBar
            percentage={percentage}
            circleWidth="80"
            colColor={colColor}
          />
        </p>
      </motion.div>
    </>
  );
};

export default MonthlyCard;
