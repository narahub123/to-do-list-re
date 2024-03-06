import axios from "axios";

const baseUrl = "http://localhost:3000";

const createMonthlyToDo = ({
  data: { column, subject, start, end, todos },
  cards,
  setCards,
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
      //   console.log(res.data.data.column);
      const response = res.data;
      const newCard = {
        user: response.user,

        data: {
          column: response.data.column,
          subject: response.data.subject,
          start: response.data.start,
          end: response.data.end,
          todos: response.data.todos,
        },
        id: response._id,
        next: response.next,
      };
      //   console.log(cards);
      //   console.log(newCard);
      setCards((cards) => [...cards, newCard]);

      const columnCards = cards.filter(
        (c) => c.data.column === response.data.column
      );

      const lastCard = columnCards.find((c) => c.next === null);

      updateMonthlyToDo(
        {
          id: lastCard.id,
          data: lastCard.data,
          next: response._id,
        },
        cards,
        setCards
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllMonthlyToDo = (setCards) => {
  axios
    .get(baseUrl)
    .then((res) => {
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

const getSingleMonthlyToDo = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/${id}`)
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteMonthlyToDo = (id, setCards) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => {
      console.log(res);
      getAllMonthlyToDo(setCards);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateMonthlyToDo = (
  { id, data: { column, subject, start, end, todos }, next },
  cards,
  setCards
) => {
  const updatedData = {
    column,
    subject,
    start,
    end,
    todos,
    next,
  };

  console.log(id, column, subject, start, end, todos, next);
  axios
    .patch(`${baseUrl}/${id}`, updatedData)
    .then((res) => {
      //   console.log(res.config.data);
      const updatedCardData = res.config.data;

      const updatedCards = [...cards];

      const index = updatedCards.findIndex(
        (card) => card.id === updatedCardData.id
      );
      if (index !== -1) {
        updatedCards[index] = updatedCardData;
        setCards(updatedCards);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  createMonthlyToDo,
  getAllMonthlyToDo,
  deleteMonthlyToDo,
  updateMonthlyToDo,
  getSingleMonthlyToDo,
};
