import { defineStore } from "pinia";
import { ref } from "vue";
import workingCalendar from "@/packages/workingCalendar";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    calendar: null,
    loading: true,
  }),

  actions: {
    init() {
      return new Promise((resolve, reject) => {
        workingCalendar()
          .then((data) => {
            this.calendar = data
            this.loading = false;
            resolve(data);
          })
          .catch(reject);
      });
    }
  }
});