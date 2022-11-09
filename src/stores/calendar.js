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
    isLoggedIn: (state) => state.loggedIn,
    tasks: (state) => state._tasks,
    self: (state) => state._self,
    hours: (state) =>
      state?._tasks?.map((el) => el.time).reduce((a, b) => a + b) / 3600,
  }
});