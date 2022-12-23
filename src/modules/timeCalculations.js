import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";
import { Hours } from "@/utils.js";
import { computed } from "vue";
import _ from "lodash";
export default () => {
  const calendar = useCalendarStore();
  calendar.init();

  const EHstore = useEHourStore();
  updateClock();

  const loading = computed(() => {
    return EHstore.isLoading || calendar.isLoading;
  });

  const workingHours = computed(() => {
    if (!calendar.calendar) return 0;
    const month = new Date().getMonth();
    return calendar.calendar[month].meta.hours;
  });

  const tracked = computed(() => {
    return Hours(EHstore.hours * 60);
  });

  const bias = computed(() => {
    const h = Hours(calendar.hourForNow * 60);
    return tracked.value.sub(h);
  });

  const todayHours = computed(() => {
    return Hours(EHstore.todayHours * 60);
  });

  const todayBias = computed(() => {
    const h = Hours(8 * 60);
    return todayHours.value.sub(h);
  });

  function updateClock() {
    EHstore.getMonthTasks();
    EHstore.getCurrentTimer();
  }

  const updateClockThrottled = _.throttle(updateClock, 1000);

  return {
    calendar,
    loading,
    workingHours,
    bias,
    updateClockThrottled,
    tracked,
    todayHours,
    todayBias,
  };
}