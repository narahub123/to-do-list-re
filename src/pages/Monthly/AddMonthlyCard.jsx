import React, { useEffect, useState } from "react";
import { FiPlus, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { InputText, InputDate } from "./Input";
import { formatDashDate, formatDotDate } from "../../util/formatDate";

const AddMonthlyCard = ({ column, setCards, week, columnWidth }) => {
  const [adding, setAdding] = useState(false);
  const [todoInputs, setTodoInputs] = useState([""]);
  const [inputs, setInputs] = useState({
    subject: "",
    start: new Date(week.monday),
    end: new Date(week.sunday),
    todos: todoInputs,
  });

  const handleAddToDo = () => {
    setTodoInputs([...todoInputs, ""]);
  };

  const handleRemove = (index) => {
    const newTodoInput = [...todoInputs];
    newTodoInput.splice(index, 1);
    setTodoInputs(newTodoInput);
  };

  // todos
  const handleValueChange = (index, value) => {
    const todos = [...todoInputs];
    todos[index] = value;
    setTodoInputs(todos);
    setInputs((prevInputs) => ({
      ...prevInputs,
      ["todos"]: todos,
    }));
  };

  // subject, start, end
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "start" || name === "end") {
      value = new Date(value);
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSumbmit = (e) => {
    e.preventDefault();

    setTodoInputs([""]);
    setAdding(false);
  };

  console.log(inputs);

  return (
    <>
      {adding ? (
        <>
          <form onSubmit={handleSumbmit}>
            <div className="add-card w-full rounded border border-violet-400 bg-violet-400/20">
              <InputText
                name="subject"
                padding="py-3"
                columnWidth={columnWidth}
                placeholder="Add new weekly plan..."
                onChange={handleInputChange}
              />
              <InputDate
                name="start"
                columnWidth={columnWidth}
                placeholder="start"
                value={week.monday}
                date={week.monday}
                onChange={handleInputChange}
              />
              <InputDate
                name="end"
                columnWidth={columnWidth}
                placeholder="end"
                value={week.sunday}
                date={week.sunday}
                onChange={handleInputChange}
              />

              {todoInputs.map((todoInput, index) => {
                console.log(todoInput);
                return (
                  <div className="flex">
                    <InputText
                      key={index}
                      name="todos"
                      padding="py-1.5"
                      value={todoInput}
                      columnWidth={columnWidth}
                      placeholder="add todo..."
                      onChange={(e) => handleValueChange(index, e.target.value)}
                    />
                    {(index !== 0 ||
                      (index === 0 && todoInputs.length > 1)) && (
                      <button
                        onClick={() => handleRemove(index)}
                        className="flex justify-center items-center mr-1.5 
                            text-neutral-400 hover:text-neutral-600"
                      >
                        <FiMinusCircle />
                      </button>
                    )}
                  </div>
                );
              })}

              <div
                onClick={handleAddToDo}
                className="flex justify-center items-center my-2 
                            text-neutral-400 hover:text-neutral-600"
              >
                <FiPlusCircle />
              </div>
            </div>

            <div className="my-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 p-1.5 text-xs
                        text-neutral-950 transition-colors hover:bg-neutral-300 "
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="add-card flex items-center justify-center gap-1.5 
                    w-full p-2 text-sm text-neutral-900
                    rounded border border-neutral-900 bg-neutral-50  transition-colors 
                  hover:text-neutral-400 hover:border-neutral-400"
        >
          <span>Add Plan</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};

export default AddMonthlyCard;
