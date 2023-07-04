// const link = "https://rabota.by/calendar";
// const metaData = ["days", "weekends", "working", "hours"];

export default async (forceYear) => {
  // return new Promise((resolve, reject) => {
  //   fetch(link)
  //     .then((result) => result.text())
  //     .then((res) => {
  //       try {
  //         let data = res.replace("<!DOCTYPE html>", "");
  //         let el = document.createElement("html");
  //         el.innerHTML = data;
  //         const monthesElements = el.querySelectorAll(".calendar-list__item");
  //         const months = [];
  //         Array.from(monthesElements).forEach((month) => {
  //           const monthData = {
  //             meta: {},
  //             days: {},
  //           };
  //           metaData.forEach((key, index) => {
  //             monthData.meta[key] = month.querySelector(
  //               `.calendar-list__overview-item:nth-child(${
  //                 index + 1
  //               }) .calendar-list__overview-value`
  //             ).innerText;
  //           });
  //           monthData.meta.title = month.querySelector(
  //             ".calendar-list__item-title"
  //           ).innerText;
  //           const days = month.querySelectorAll(
  //             ".calendar-list__numbers__item:not(.calendar-list__numbers__item_other)"
  //           );
  //           Array.from(days).forEach((day) => {
  //             const tempDay = {
  //               isWeekend: day.classList.contains(
  //                 "calendar-list__numbers__item_day-off"
  //               ),
  //               isShort: day.classList.contains(
  //                 "calendar-list__numbers__item_shortened"
  //               ),
  //               reason: "",
  //             };
  //             if (tempDay.isWeekend || tempDay.isShort) {
  //               const reasonWrapper = day.querySelector(".calendar-hint");
  //               tempDay.reason = reasonWrapper ? reasonWrapper.innerText.trim() : "";
  //             }
  //             let n = parseInt(day.innerText.trim());
  //             monthData.days[n] = tempDay;
  //           });
  //           months.push(monthData);
  //         });
  //         console.log(JSON.stringify(months, null, 2));
  //         resolve(months);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  // });

  let year;
  if(forceYear) {
    year = forceYear;
  } else {
    year = (new Date()).getFullYear();
  }
  const test = await import(`./c-${year}.json`)
  return test.default
}