import { col_colors } from "../data/colColors";

const current = new Date();
const year = current.getFullYear();
const month = current.getMonth();
const date = current.getDate();

const mondays = [];
const sundays = [];
const weeks = [];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 2자리 숫자로 맞추기
  const day = String(date.getDate()).padStart(2, "0"); // 일자를 2자리 숫자로 맞추기
  return `${year}.${month}.${day}`;
};

const getMondayInMonth = (year, month) => {
  const first = new Date(year, month, 1);
  const previousMonday = new Date(year, month, 1 - first.getDay() + 1);
  const previousSunday = new Date(year, month, 1 - first.getDay() + 7);
  // console.log(previousMonday);
  mondays.push(previousMonday);
  sundays.push(previousSunday);

  const last = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= last; i++) {
    let date = new Date(year, month, i);
    if (date.getDay() === 1) {
      mondays.push(date);
      const sunday = new Date(year, month, i + 6);
      sundays.push(sunday);
    }
  }
};
getMondayInMonth(year, month);
// console.log(mondays);
// console.log(sundays);

const getWeekNumber = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();

  const today = new Date(year, month, dayOfMonth);

  const firstOfYear = new Date(year, 0, 1);
  const firstMonday = new Date(firstOfYear);
  while (firstMonday.getDay() !== 1) {
    firstMonday.setDate(firstMonday.getDate() + 1);
  }

  // 첫 번째 월요일이 주어진 날짜 이전인지 여부 확인
  const diffMs = today - firstMonday;
  const diffDays = diffMs / (1000 * 60 * 60 * 24) + 1;
  let weekNumber = Math.floor(diffDays / 7) + 1;

  // 주어진 날짜가 이전 연도의 마지막 주에 속하는 경우 주 번호 조정
  if (weekNumber === 0) {
    const prevYear = year - 1;
    const lastDayOfPrevYear = new Date(prevYear, 11, 31);
    const lastMondayOfPrevYear = new Date(lastDayOfPrevYear);
    while (lastMondayOfPrevYear.getDay() !== 1) {
      lastMondayOfPrevYear.setDate(lastMondayOfPrevYear.getDate() - 1);
    }
    weekNumber = 53; // ISO 8601 표준
    if (today >= lastMondayOfPrevYear) {
      weekNumber = 1;
    }
  }

  // console.log(weekNumber);
  return weekNumber;
};

getWeekNumber(current);

const getWeeksInMonth = (mondays) => {
  for (let monday of mondays) {
    weeks.push(getWeekNumber(monday));
  }
};

getWeeksInMonth(mondays);
// console.log(weeks);

export const weeksInMonth = [];

for (let i = 0; i < mondays.length; i++) {
  const monday = formatDate(mondays[i]);
  let sunday = formatDate(sundays[i]);
  sunday = sunday.split(".")[1] + "." + sunday.split(".")[2];
  const week = {
    week: weeks[i],
    monday: monday,
    sunday: sunday,
    colColor: col_colors[i],
  };

  weeksInMonth.push(week);
}
