// используйте https://github.com/dowellkin/calendar-parser
// чтобы получить json файл с производственным календарем
// (пока не поменяли верстку на rabota.by)

export default async (forceYear) => {
  let year;
  if(forceYear) {
    year = forceYear;
  } else {
    year = (new Date()).getFullYear();
  }
  const test = await import(`./c-${year}.json`)
  return test.default
}