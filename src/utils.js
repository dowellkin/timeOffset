import Hours from "@/packages/hours"

export function lastMonthDay(interestedDate = new Date(), interestedMonth = new Date().getMonth()) {
  const nextMonth = interestedMonth + 1;
  const nextMonthFirstDay = new Date(
    interestedDate.getFullYear(),
    nextMonth,
    1
  );
  const oneDay = 1 * 24 * 3600 * 1000;
  const lastTime = new Date(nextMonthFirstDay - oneDay);
  return lastTime;
}

export const map = (value, low1, high1, low2, high2) => {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
};

export const numFormat = (value) => {
  return String(value).padStart(2, "0");
};

export const dateToString = (date) => {
  return `${date.getFullYear()}-${numFormat(date.getMonth() + 1)}-${numFormat(date.getDate())}`
}

export const todayString = () => {
  const d = new Date();
  return dateToString(d)
}

export const thatYearAndMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${numFormat(d.getMonth() + 1)}`
}

export const getDateString = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  let todateString = date.toLocaleDateString("ru", options);
  todateString = todateString.replace(" г.", "");
  todateString = todateString.replace(/\s(\d{4})/, ",\xa0$1");
  todateString = todateString.replaceAll(/\s/g, "\xa0");
  return todateString;
}

export const getMonday = (d) => {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export const getSunday = (d) => {
  const date = getMonday(d);
  return new Date(date.setDate(date.getDate() + 6));
}

export { Hours };