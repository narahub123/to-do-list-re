import React, { useRef, useState } from "react";
import { FiPlus, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { InputText, InputDate } from "./Input";
import { formatDashDate, formatDateDash } from "../../util/formatDate";
import MonthlyValidationModal from "./Modal/MonthlyValidationModal";
import { motion } from "framer-motion";

const AddMonthlyCard = ({ column, setCards, week, columnWidth }) => {
  const [adding, setAdding] = useState(false);
  const [todoInputs, setTodoInputs] = useState([
    { task: "", completed: false },
  ]);
  const [inputs, setInputs] = useState({
    subject: "",
    start: new Date(week.monday),
    end: new Date(week.sunday),
    todos: todoInputs,
  });

  const [outOfRange, setOutOfRange] = useState(false);
  const [exceedEnd, setExceedEnd] = useState(false);

  const validationModal = useRef();

  const handleAddToDo = () => {
    setTodoInputs([...todoInputs, { task: "", completed: false }]);
  };

  const handleRemove = (index) => {
    const newTodoInput = [...todoInputs];
    newTodoInput.splice(index, 1);
    setTodoInputs(newTodoInput);
  };

  // todos
  const handleValueChange = (index, value) => {
    const todos = [...todoInputs];
    todos[index] = { ...todos[index], task: value };
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
      value = formatDashDate(value);
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSumbmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    const { subject, start, end, todos } = inputs;

    // validation
    if (subject === "") {
      validationModal.current.open();
      return;
    }

    // console.log(start);
    // console.log(new Date(week.monday));
    if (start < new Date(week.monday)) {
      setOutOfRange(true);
      validationModal.current.open();
      return;
    }

    if (end > new Date(week.sunday)) {
      setOutOfRange(true);
      validationModal.current.open();
      return;
    }

    if (start > end) {
      setExceedEnd(true);
      validationModal.current.open();

      return;
    }

    for (let todo of todos) {
      // console.log("todo", todo);
      if (todo.task === "") {
        validationModal.current.open();
        return;
      }
    }

    setTodoInputs([{ task: "", completed: false }]);
    setInputs({
      subject: "",
      start: new Date(week.monday),
      end: new Date(week.sunday),
      todos: [{ task: "", completed: false }],
    });
    setAdding(false);

    // console.log(inputs);

    setCards((prevCards) => [
      ...prevCards,
      {
        column: week.weekNum,
        subject,
        start: formatDateDash(start).slice(5),
        end: formatDateDash(end).slice(5),
        todos,
      },
    ]);
  };

  return (
    <>
      {adding ? (
        <>
          {outOfRange ? (
            <MonthlyValidationModal
              ref={validationModal}
              buttonCaption="okay"
              title="Out Of Range"
              situation="Oops ... looks like you set a date out of range"
              information="Please make sure you set a date within the week."
              setOutOfRange={setOutOfRange}
              setExceedEnd={setExceedEnd}
            ></MonthlyValidationModal>
          ) : exceedEnd ? (
            <MonthlyValidationModal
              ref={validationModal}
              buttonCaption="okay"
              title="Exceed End Date"
              situation="Oops ... looks like the start date exceeds the end date"
              information="Please make sure you set the start date equal to or earlier than
                the end date"
              setOutOfRange={setOutOfRange}
              setExceedEnd={setExceedEnd}
            ></MonthlyValidationModal>
          ) : (
            <MonthlyValidationModal
              ref={validationModal}
              buttonCaption="okay"
              title="Invalid Input"
              situation="Oops ... looks like you forget to enter a value"
              information="Please make sure you provide a valid value for every input field"
              setOutOfRange={setOutOfRange}
              setExceedEnd={setExceedEnd}
            ></MonthlyValidationModal>
          )}

          <motion.form layout onSubmit={handleSumbmit}>
            <div
              key={column}
              column={week.weekNum}
              className="add-card w-full rounded border border-violet-400 bg-violet-400/20"
            >
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
                date={week.monday}
                onChange={handleInputChange}
              />
              <InputDate
                name="end"
                columnWidth={columnWidth}
                placeholder="end"
                date={week.sunday}
                onChange={handleInputChange}
              />

              {todoInputs.map((todoInput, index) => {
                return (
                  <div className="flex" key={index}>
                    <InputText
                      key={index}
                      name="todos"
                      padding="py-1.5"
                      value={todoInput.task}
                      columnWidth={columnWidth}
                      placeholder="add todo..."
                      onChange={(e) => handleValueChange(index, e.target.value)}
                    />
                    {
                      //
                      ((index !== 0 && index < todoInputs.length - 1) ||
                        (index === 0 && todoInputs.length > 1)) && (
                        <button
                          onClick={() => handleRemove(index)}
                          className="flex justify-center items-center mr-1.5 
                            text-neutral-400 hover:text-neutral-600"
                        >
                          <FiMinusCircle />
                        </button>
                      )
                    }
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
          </motion.form>
        </>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="add-card flex items-center justify-center gap-1.5 
                    w-full p-2 text-sm mt-0.5 text-neutral-900
                    rounded border border-neutral-900 bg-neutral-50  transition-colors 
                  hover:text-neutral-400 hover:border-neutral-400"
        >
          <span>Add Plan</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddMonthlyCard;
