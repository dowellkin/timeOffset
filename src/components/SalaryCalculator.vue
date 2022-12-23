<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { useCalendarStore } from "@/stores/calendar.js";
import { computed, ref } from "vue"

const calendar = useCalendarStore();
calendar.init();

const EHstore = useEHourStore();

const workingHours = computed(() => {
  if(!calendar.calendar) return 0
  const month = new Date().getMonth();
  return calendar.calendar[month].meta.hours;
})

const salary = ref(300);

const hours = computed(() => {
  return EHstore.hours;
})

const rate = computed(() => {
  const mustMins = workingHours.value;
  return salary.value / mustMins;
})

const bias = computed(() => {
  const h = calendar.hourForNow
  return hours.value - h;
})

const nowSalary = computed(() => {
  const worked = Math.min(hours.value, workingHours.value);
  const rateMul = bias.value > 0 ? 2 : 0;
  return (worked + bias.value * rateMul) * rate.value;
})

const biasSalary = computed(() => {
  const rateMul = bias.value > 0 ? 2 : 1;
  const overpay = bias.value * rate.value * rateMul;
  
  return +salary.value + overpay;
})

const loading = computed(() => {
  return EHstore.isLoading;
});
</script>

<style scoped>
.salary-input {
    display: block;
    max-width: 300px;
}
</style>

<template>
  <div v-if="!loading" class="calculator">
    Введите свою зп в месяц:
    <a-input class="salary-input" type="number" v-model:value="salary" addonAfter="$" :maxlength="5"></a-input>

    <p>
      Реальные значения могут отличаться, вычесленные значения примерны.
    </p>
    <p>
      rate: {{ rate.toFixed(2) }}$
    </p>
    <p>
      зп на нышенем времени: {{ nowSalary.toFixed(2) }}$
    </p>
    <p>
      полная зп при нышених переработках: {{ biasSalary.toFixed(2) }}$
    </p>
  </div>
  <a-skeleton v-else :paragraph="{rows: 5}" :title="false"></a-skeleton>
</template>