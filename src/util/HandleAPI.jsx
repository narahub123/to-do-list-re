import axios from "axios";

const baseUrl = "http://localhost:3000";

const createMonthlyToDo = ({ data: { subject, start, end, todos } }) => {
  if (!subject || !start || !end || !Array.isArray(todos)) {
    console.error("Invalid parameters provided");
    return;
  }

  const data = {
    subject: subject,
    start: start,
    end: end,
    todos: todos,
  };

  console.log(data.subject, data.start, data.end, data.todos);
  
  axios
    .post(`${baseUrl}/save`, { data: data })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createMonthlyToDo };
