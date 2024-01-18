<script setup>
import TaskList from "@/components/TaskList/index.vue";
import { ref, computed, watch } from 'vue';
import { useEHourStore } from "@/stores/everhour.js";
import { lastMonthDay, getDateString, getMonday, getSunday } from "@/utils.js";
const day = ref();
const week = ref();
const month = ref();
const type = ref('day');
const collapsed = ref(true);

const EHstore = useEHourStore();

const getFirstLastDateWeek = computed(() => {
  if(!week.value) return {firstDate: "", lastDate: ""};
  const firstDate = getMonday(week.value.$d)
  const lastDate = getSunday(week.value.$d)
  return {firstDate, lastDate}
})

const getFirstLastDateMonth = computed(() => {
  if(!month.value) return {firstDate: "", lastDate: ""};
  const monthNum = month.value.$d.getMonth()
  const firstDate = new Date(month.value.$d.setMonth(monthNum, 1))
  const lastDate = lastMonthDay(month.value.$d, monthNum)
  return {firstDate, lastDate}
})

const dateString = computed(() => {
  if(type.value == 'day') {
    if(!day.value) return "";

    return getDateString(day.value.$d)
  }

  if(type.value == 'week') {
    const {firstDate, lastDate} = getFirstLastDateWeek.value
    if(!firstDate || !lastDate) {
      return ""
    }

    return `${getDateString(firstDate)} - ${getDateString(lastDate)}`
  }

  if(type.value == 'month') {
    const {firstDate, lastDate} = getFirstLastDateMonth.value
    if(!firstDate || !lastDate) {
      return ""
    }
    
    return `${getDateString(firstDate)} - ${getDateString(lastDate)}`
  }

  return "";
})

const tasks = computed(() => {
  if(day.value && type.value === 'day') {
    return EHstore.getTasksFromDateToDate(day.value.$d, day.value.$d)
  }

  if(week.value && type.value === 'week') {
    return EHstore.getTasksFromDateToDate(getFirstLastDateWeek.value.firstDate, getFirstLastDateWeek.value.lastDate)
  }

  if(month.value && type.value === 'month') {
    return EHstore.getTasksFromDateToDate(getFirstLastDateMonth.value.firstDate, getFirstLastDateMonth.value.lastDate)
  }

  return []
})

watch(day, () => {
  EHstore.getTasksFromTo(day.value.$d, day.value.$d)
})

watch(week, () => {
  const {firstDate, lastDate} = getFirstLastDateWeek.value
  EHstore.getTasksFromTo(firstDate, lastDate)
})

watch(month, () => {
  const {firstDate, lastDate} = getFirstLastDateMonth.value
  EHstore.getTasksFromTo(firstDate, lastDate)
})
</script>

<template>
  <main>
    <div class="container">
      <a-space style="margin-bottom: 20px">
        <a-select
          ref="select"
          v-model:value="type"
          style="width: 120px"
        >
          <a-select-option value="day">Day</a-select-option>
          <a-select-option value="week">Week</a-select-option>
          <a-select-option value="month">Month</a-select-option>
        </a-select>

        <a-date-picker v-if="type === 'day'" v-model:value="day"/>
        <a-date-picker v-else-if="type === 'week'" v-model:value="week" picker="week"/>
        <a-date-picker v-else-if="type === 'month'" v-model:value="month" picker="month"/>

        <a-checkbox v-model:checked="collapsed">Collapsed</a-checkbox>
      </a-space>

      <h2 v-if="type != 'day'">{{ dateString }}</h2>

      <TaskList
        :task-list="tasks"
        :collapsed="collapsed"
      >
      </TaskList>
    </div>
  </main>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

</style>