import axios from "axios";

const baseUrl = "http://localhost:3000";

const createMonthlyToDo = ({
  data: { column, subject, start, end, todos },
}) => {
  if (!column || !subject || !start || !end || !Array.isArray(todos)) {
    console.error("Invalid parameters provided");
    return;
  }

  const data = {
    column: column,
    subject: subject,
    start: start,
    end: end,
    todos: todos,
  };

  console.log(data.column, data.subject, data.start, data.end, data.todos);

  axios
    .post(`${baseUrl}/save`, { data: data })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllMonthlyToDo = (setCards) => {
  axios
    .get(baseUrl)
    .then((res) => {
      //   console.log(res.data);
      let plans = res.data;
      setCards(
        plans.map((plan) => ({
          user: plan.user,
          data: {
            column: plan.data.column,
            subject: plan.data.subject,
            start: plan.data.start,
            end: plan.data.end,
            todos: plan.data.todos.map((todo) => ({
              task: todo.task,
              completed: todo.completed,
            })),
          },
          id: plan._id,
          next: plan.next,
        }))
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createMonthlyToDo, getAllMonthlyToDo };
