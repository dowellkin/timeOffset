<script setup>
import TaskList from "@/components/TaskList/index.vue";
import { ref, computed, watch } from 'vue';
import { useEHourStore } from "@/stores/everhour.js";
import { lastMonthDay, getDateString, getMonday, getSunday } from "@/utils.js";
const day = ref();
const week = ref();
const month = ref();
const type = ref('day');
const collapsed = ref(false);

const EHstore = useEHourStore();

function log(e1, e2) {
  console.log(e1, e2)
}

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

        <a-date-picker v-if="type === 'day'" v-model:value="day" @change="log" />
        <a-date-picker v-else-if="type === 'week'" v-model:value="week" picker="week" @change="log"/>
        <a-date-picker v-else-if="type === 'month'" v-model:value="month" picker="month" @change="log"/>

        <!-- <a-checkbox v-model:checked="collapsed">Collapsed</a-checkbox> -->
      </a-space>

      <h2 v-if="type != 'day'">{{ dateString }}</h2>

      

      <template v-if="day && type === 'day'">
        <TaskList
          :task-list="EHstore.getTasksFromDateToDate(day.$d, day.$d)"
          :collapsed="collapsed"
        >
        </TaskList>
      </template>
      <template v-else-if="week && type === 'week'">
        <TaskList
          :task-list="EHstore.getTasksFromDateToDate(getFirstLastDateWeek.firstDate, getFirstLastDateWeek.lastDate)"
          :collapsed="collapsed"
        >
        </TaskList>
      </template>
      <template v-else-if="month && type === 'month'">
        <TaskList
          :task-list="EHstore.getTasksFromDateToDate(getFirstLastDateMonth.firstDate, getFirstLastDateMonth.lastDate)"
          :collapsed="collapsed"
        >
        </TaskList>
      </template>
    </div>
  </main>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

</style>