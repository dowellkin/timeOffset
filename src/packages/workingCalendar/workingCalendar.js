const link = "https://rabota.by/calendar";
const metaData = ["days", "weekends", "working", "hours"];

const proxy = `https://thingproxy.freeboard.io/fetch/${link}`;

export default () => {
  return new Promise((resolve, reject) => {
    fetch(proxy)
      .then((result) => result.text())
      .then((res) => {
        try {
          let data = res.replace("<!DOCTYPE html>", "");
          let el = document.createElement("html");
          el.innerHTML = data;
          const monthesElements = el.querySelectorAll(".calendar-list__item");
          const months = [];
          Array.from(monthesElements).forEach((month) => {
            const monthData = {
              meta: {},
              days: {},
            };
            metaData.forEach((key, index) => {
              monthData.meta[key] = month.querySelector(
                `.calendar-list__overview-item:nth-child(${
                  index + 1
                }) .calendar-list__overview-value`
              ).innerText;
            });
            monthData.meta.title = month.querySelector(
              ".calendar-list__item-title"
            ).innerText;
            const days = month.querySelectorAll(
              ".calendar-list__numbers__item:not(.calendar-list__numbers__item_other)"
            );
            Array.from(days).forEach((day) => {
              const tempDay = {
                isWeekend: day.classList.contains(
                  "calendar-list__numbers__item_day-off"
                ),
                isShort: day.classList.contains(
                  "calendar-list__numbers__item_shortened"
                ),
                reason: "",
              };
              if (tempDay.isWeekend || tempDay.isShort) {
                tempDay.reason = day
                  .querySelector(".calendar-hint")
                  .innerText.trim();
              }
              let n = parseInt(day.innerText.trim());
              monthData.days[n] = tempDay;
            });
            months.push(monthData);
          });
          resolve(months);
        } catch (error) {
          reject(error);
        }
      });
  });
}