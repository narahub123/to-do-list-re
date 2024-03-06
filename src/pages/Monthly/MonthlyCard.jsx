import React, { useState } from "react";
import { FiEdit, FiTrash, FiSave, FiRotateCcw } from "react-icons/fi";
import { LuCheckSquare, LuSquare } from "react-icons/lu";
import CircleProgressBar from "./CircleProgressBar";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { formatDateDash } from "../../util/formatDate";
import { deleteMonthlyToDo, updateMonthlyToDo } from "../../util/HandleAPI";

const MonthlyCard = ({
  id,
  data,
  colColor,
  handleDragStart,
  cards,
  setCards,
}) => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [subject, setSubject] = useState(data.subject);
  const [start, setStart] = useState(data.start);
  const [end, setEnd] = useState(data.end);
  // const [todos, setTodos] = useState(data.todos);
  const [task, setTask] = useState(data.todos.task);
  const [column, setColumn] = useState(data.column);

  const { todos } = data;
  // console.log(cards);
  // console.log(data.todos);

  const handleDeleteCard = (id) => {
    deleteMonthlyToDo(id, setCards);
  };

  const handleInputChange = (field, value) => {
    if (field === "subject") {
      setSubject(value);
    } else if (field === "start") {
      setStart(value);
    } else if (field === "end") {
      setEnd(value);
    } else if (field === "task") {
      setTask(value);
    }

    setCards((cards) => {
      const updatedCards = [...cards];

      const index = cards.findIndex((c) => c.id === id);

      if (index !== -1) {
        updatedCards[index] = {
          ...updatedCards[index],
          [field]: value,
        };
      }
      return updatedCards;
    });
    console.log(subject, start, end, todos);
  };

  const updateCard = (id, column, subject, start, end, todos, next) => {
    updateMonthlyToDo(
      {
        id,
        data: { column, subject, start, end, todos },
        next,
      },
      cards,
      setCards
    );

    setUpdating(false);
  };

  const handleUpdateCard = () => {
    setUpdating(true);
  };

  const handleCancel = () => {
    setUpdating(false);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...data.todos];
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
  let bgColor = "bg-neutral-100";

  if (colColor === "red") {
    boardColor =
      "border-red-500 hover:border-red-300 group-hover:border-red-300";
    bgColor = "bg-red-100";
  } else if (colColor === "yellow") {
    boardColor =
      "border-yellow-500 hover:border-yellow-300 group-hover:border-yellow-300";
    bgColor = "bg-yellow-100";
  } else if (colColor === "blue") {
    boardColor =
      "border-blue-500 hover:border-blue-300 group-hover:border-blue-300";
    bgColor = "bg-blue-100";
  } else if (colColor === "emerald") {
    boardColor =
      "border-emerald-500 hover:border-emerald-300 group-hover:border-emerald-300";
    bgColor = "bg-emerald-100";
  } else if (colColor === "green") {
    boardColor =
      "border-green-500 hover:border-green-300 group-hover:border-green-300";
    bgColor = "bg-green-100";
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
      <DropIndicator beforeId={id} column={column} />
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
        {updating ? (
          <>
            <div className="card-header flex gap-1 items-center justify-between">
              <input
                type="text"
                className={`subject text-base w-full text-neutral-700 ${bgColor}`}
                defaultValue={subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>
            <p
              className={`card-date border-b-2 text-right pb-1 pl-0.5 ${boardColor}`}
            >
              <input
                type="date"
                className={`start-date text-xs pr-0.5 w-full text-neutral-500 ${bgColor}`}
                defaultValue={formatDateDash(start)}
                onChange={(e) => handleInputChange("start", e.target.value)}
              />
              <input
                type="date"
                className={`start-date text-xs pr-0.5 w-full text-neutral-500 ${bgColor}`}
                defaultValue={formatDateDash(end)}
                onChange={(e) => handleInputChange("end", e.target.value)}
              />
            </p>

            {todos.map((todo, index) => (
              <p
                key={index}
                className="card-todos flex items-center text-sm   text-neutral-700 mt-2 "
                onClick={() => toggleTodoCompletion(index)}
              >
                <input
                  type="text"
                  className={`task text-base w-full text-neutral-700 ${bgColor}`}
                  defaultValue={todo.task}
                  onChange={(e) => handleInputChange("task", e.target.value)}
                />
              </p>
            ))}
            <p className="control-icons flex justify-end mt-2 gap-1 text-neutral-700">
              <FiSave
                onClick={() =>
                  updateCard(id, column, subject, start, end, todos)
                }
                className="card-edit hover:text-neutral-500"
              />
              <FiRotateCcw
                onClick={() => handleCancel()}
                className="card-delete hover:text-neutral-500"
              />
            </p>
          </>
        ) : (
          <>
            <div className="card-header flex items-center justify-between">
              <p className="subject text-base text-neutral-700">{subject}</p>
              <p className="control-icons flex gap-1 text-neutral-700">
                <FiEdit
                  onClick={() => handleUpdateCard()}
                  className="card-edit hover:text-neutral-500"
                />
                <FiTrash
                  onClick={() => handleDeleteCard(id)}
                  className="card-delete hover:text-neutral-500"
                />
              </p>
            </div>
            <p
              className={`card-date border-b-2 text-right pl-0.5 ${boardColor}`}
            >
              <span className="start-date text-xs pr-0.5 text-neutral-500">
                {formatDateDash(start).slice(5)}
              </span>
              <span className="text-xs text-neutral-500">~</span>
              <span className="end-date text-xs pl-0.5 text-neutral-500">
                {formatDateDash(end).slice(5)}
              </span>
            </p>

            {todos.map((todo, index) => (
              <p
                key={index}
                className="card-todos flex items-center text-sm   text-neutral-700 mt-2"
                onClick={() => toggleTodoCompletion(index)}
              >
                {todo.completed ? <LuCheckSquare /> : <LuSquare />}
                <span className={`ml-1 ${todo.completed && "line-through"}`}>
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
          </>
        )}
      </motion.div>
    </>
  );
};

export default MonthlyCard;
