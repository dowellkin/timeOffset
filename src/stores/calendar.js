import { defineStore } from "pinia";
import workingCalendar from "@/packages/workingCalendar";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    _calendar: null,
    loading: true,
  }),

  actions: {
    init() {
      return new Promise((resolve, reject) => {
        workingCalendar()
          .then((data) => {
            this._calendar = data;
            this.loading = false;
            resolve(data);
          })
          .catch(reject);
      });
    },
  },

  getters: {
    calendar: (state) => state._calendar,
    hourForNow: (state) => {
      const d = new Date();
      const month = d.getMonth();
      const date = d.getDate();
      if (!state._calendar) return 0;
      const daysArr = state._calendar[month].days;
      const days = [];
      for (let i = 1; i < date + 1; i++) {
        if (!daysArr[i].isWeekend) {
          days.push(daysArr[i]);
        }
      }

      return days.length * 8;
    },
    isLoading: (state) => state.loading,
  },
});