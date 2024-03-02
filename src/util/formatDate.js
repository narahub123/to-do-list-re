// dash to date
export const formatDashDate = (date) => {
  //   console.log(date);
  const year = date.split("-")[0];
  const month = date.split("-")[1] - 1;
  const dates = date.split("-")[2];

  return new Date(year, month, dates);
};

// dot to date
export const formatDotDate = (date) => {
  //   console.log(date);
  const year = date.split(".")[0];
  const month = date.split(".")[1] - 1;
  const dates = date.split(".")[2];

  return new Date(year, month, dates);
};

// date to dash
export const formatDateDash = (date) => {
  date = new Date(date);
  //   console.log(date);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dates = date.getDate();

  month = month < 10 ? "0" + month : month;

  dates = dates < 10 ? "0" + dates : dates;

  //   console.log(year, month, dates);
  return year + "-" + month + "-" + dates;
};

// date to dot
export const formatDateDot = (date) => {
  date = new Date(date);
  //   console.log(date);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dates = date.getDate();

  month = month < 10 ? "0" + month : month;

  dates = dates < 10 ? "0" + dates : dates;

  console.log(year, month, dates);
  return year + "." + month + "." + dates;
};

export const formatDateDate = (date) => {
  date = new Date(date);
  //   console.log(date);
  const year = date.getFullYear();
  let month = date.getMonth();
  let dates = date.getDate();

  return new Date(year, month, dates);
};
