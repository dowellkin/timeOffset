import { defineStore } from "pinia";
import { ref } from "vue";
import workingCalendar from "@/packages/workingCalendar";

export const useCalendarStore = defineStore("calendar", () => {
  const calendar = ref(null);
  const loading = ref(true);

  function init() {
    return new Promise((resolve, reject) => {
      workingCalendar()
        .then((data) => {
          calendar.value = data
          loading.value = false;
          resolve(data);
        })
        .catch(reject);
    });
  }

  return { calendar, loading, init };
});
