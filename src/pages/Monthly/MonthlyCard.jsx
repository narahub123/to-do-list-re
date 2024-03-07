import React, { useRef, useState } from "react";
import { FiEdit, FiTrash, FiSave, FiRotateCcw } from "react-icons/fi";
import { LuCheckSquare, LuSquare } from "react-icons/lu";
import CircleProgressBar from "./CircleProgressBar";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { formatDateDash } from "../../util/formatDate";
import { deleteMonthlyToDo, updateMonthlyToDo } from "../../util/HandleAPI";
import MonthlyWarningModal from "./Modal/MonthlyWarningModal";

const MonthlyCard = ({
  id,
  data,
  colColor,
  handleDragStart,
  cards,
  setCards,
}) => {
  const [warning, setWarning] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [subject, setSubject] = useState(data.subject);
  const [start, setStart] = useState(data.start);
  const [end, setEnd] = useState(data.end);

  const { todos, column } = data;

  const warningModal = useRef();

  // console.log(cards);
  // console.log(todos);

  const handleDeleteCard = (id) => {
    deleteMonthlyToDo(id, setCards);
  };

  const handleTaskInputChange = (field, value, taskIndex) => {
    setCards((cards) => {
      return cards.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            data: {
              ...c.data,
              todos: c.data.todos.map((todo, index) => {
                if (index === taskIndex) {
                  return { ...todo, [field]: value };
                }
                return todo;
              }),
            },
          };
        }
        return c;
      });
    });
  };

  const handleInputChange = (field, value) => {
    if (field === "subject") {
      setSubject(value);
    } else if (field === "start") {
      setStart(value);
    } else if (field === "end") {
      setEnd(value);
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

      console.log(updatedCards);
      return updatedCards;
    });
    console.log(subject, start, end);
  };

  const updateCard = (id, column, subject, start, end, todos) => {
    updateMonthlyToDo(
      {
        id,
        data: { column, subject, start, end, todos },
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
    setCards((cards) => {
      const updatedCards = [...cards];
      const cardIndex = updatedCards.findIndex((c) => c.id === id);
      const updatedTodos = [...updatedCards[cardIndex].data.todos];
      updatedTodos[index] = {
        ...updatedTodos[index],
        completed: !updatedTodos[index].completed,
      };
      updatedCards[cardIndex].data.todos = updatedTodos;

      console.log(updatedCards[cardIndex].data.todos);

      const todos = updatedCards[cardIndex].data.todos;

      updateMonthlyToDo(
        {
          id,
          data: { column, subject, start, end, todos },
        },
        cards,
        setCards
      );
      return updatedCards;
    });
  };

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

  // console.log(cards);
  // console.log(todos);

  const handleOpenWarningModal = () => {
    setWarning(true);
    console.log(warning);
    console.log(warningModal);
    warningModal.current.open();
  };
  return (
    <>
      {warning && (
        <MonthlyWarningModal
          ref={warningModal}
          title="Warning : Delete a To-Do"
          situation="You are trying to delete a to-do list"
          information="It can not be recovered"
          cancel="cancel"
          confirm="okay"
          id={id}
          handleDeleteCard={handleDeleteCard}
          setWarning={() => setWarning(true)}
        />
      )}
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, {
            id,
            subject,
            todos,
            start,
            end,
            column,
          })
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

            {cards.map((c) => {
              if (c.id === id) {
                return c.data.todos.map((todo, index) => (
                  <p
                    key={index}
                    className="card-todos flex items-center text-sm text-neutral-700 mt-2"
                  >
                    <input
                      type="text"
                      className={`task text-base w-full text-neutral-700 ${bgColor}`}
                      defaultValue={todo.task}
                      onChange={(e) =>
                        handleTaskInputChange("task", e.target.value, index)
                      }
                    />
                  </p>
                ));
              }
            })}

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
                  onClick={handleOpenWarningModal}
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

            {cards.map((c) => {
              if (c.id === id) {
                return c.data.todos.map((todo, index) => (
                  <p
                    key={index}
                    className="card-todos flex items-center text-sm text-neutral-700 mt-2"
                    onClick={() => toggleTodoCompletion(index)}
                  >
                    {todo.completed ? <LuCheckSquare /> : <LuSquare />}
                    <span
                      className={`ml-1 ${todo.completed && "line-through"}`}
                    >
                      {todo.task}
                    </span>
                  </p>
                ));
              } else {
                return null;
              }
            })}

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
