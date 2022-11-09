<script setup>
import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";
import { map } from "@/utils.js"
import { computed } from "vue"

const calendar = useCalendarStore();
calendar.init();

const EHstore = useEHourStore();
EHstore.getMonthTasks();

const hours = computed(() => {
  return Math.floor(EHstore.hours);
})
const minutes = computed(() => {
  return Math.round(map(EHstore.hours % 1, 0, 1, 0, 60));
})

const month = new Date().getMonth();
const workingHours = computed(() => {
  return calendar.calendar[month].meta.hours;
})

const tracked = computed(() => {
  return `${hours.value}h ${minutes.value}m`
})

</script>

<template>
  <main>
    <p>
      you tracked: {{tracked}}
    </p>
    <p>
      month: {{workingHours}}h
    </p>
    <p>
      precents: {{hours / workingHours * 100}}%
    </p>
  </main>
</template>
