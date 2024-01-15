import Hours from "@/packages/hours"

export function lastMonthDay(interestedMonth = new Date().getMonth()) {
  const date = new Date();
  const nextmonth = interestedMonth + 1;
  const nextmonthfirstday = new Date(date.getFullYear(), nextmonth, 1);
  const oneday = 1 * 24 * 3600 * 1000;
  const lasttime = new Date(nextmonthfirstday - oneday);
  return lasttime;
}

export const map = (value, low1, high1, low2, high2) => {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
};

export const numFormat = (value) => {
  return String(value).padStart(2, "0");
};

export const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${numFormat(d.getMonth() + 1)}-${numFormat(d.getDate())}`
}

export const thatYearAndMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${numFormat(d.getMonth() + 1)}`
}

export { Hours };