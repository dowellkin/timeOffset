<script setup>
import { ref, computed } from 'vue';
import { useEHourStore } from "@/stores/everhour.js";
const day = ref();
const week = ref();
const month = ref();
const type = ref('day');
const dataToDisplay = ref([]);

const EHstore = useEHourStore();

function log(e1, e2) {
  console.log(e1, e2)
}

function getDateString(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let todateString = date.toLocaleDateString('ru', options);
  todateString = todateString.replace(' г.', '');
  todateString = todateString.replace(/\s(\d{4})/, ', $1');
  return todateString
}

function getMonday(d) {
  d = new Date(d);
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getSunday(d) {
  const date = getMonday(d)
  return new Date(date.setDate(date.getDate() + 6));
}

function lastMonthDay(interestedMonth = new Date().getMonth()) {
  const date = new Date();
  const nextmonth = interestedMonth + 1;
  const nextmonthfirstday = new Date(date.getFullYear(), nextmonth, 1);
  const oneday = 1 * 24 * 3600 * 1000;
  const lasttime = new Date(nextmonthfirstday - oneday);
  return lasttime;
}

const dateString = computed(() => {
  if(type.value == 'day') {
    if(!day.value) return "";
    EHstore
    return getDateString(day.value.$d)
  }

  if(type.value == 'week') {
    if(!week.value) return "";
    const firstDate = getMonday(week.value.$d)
    const lastDate = getSunday(week.value.$d)
    return `${getDateString(firstDate)} - ${getDateString(lastDate)}`
  }

  if(type.value == 'month') {
    if(!month.value) return "";
    const monthNum = month.value.$d.getMonth()
    const firstDate = new Date(month.value.$d.setMonth(monthNum, 1))
    const lastDate = lastMonthDay(monthNum)
    return `${getDateString(firstDate)} - ${getDateString(lastDate)}`
  }

  return "";
})
</script>

<template>
  <main>
    <div class="container">
      <a-space direction="vertical" :value="16">
        <a-space>
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
        </a-space>

        <h2>{{ dateString }}</h2>


      </a-space>
    </div>
  </main>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

</style>