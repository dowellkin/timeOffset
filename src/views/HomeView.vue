<script setup>
import User from "@/components/UserInfo.vue"
import calculator from "@/components/Calculator.vue"
import MonthCalculations from "@/components/MonthCalculations.vue"
import DayCalculations from "@/components/DayCalculations.vue"
import { ref } from "vue"

import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";

const calendar = useCalendarStore();
calendar.init();

const EHstore = useEHourStore();
EHstore.getMonthTasks();
EHstore.getCurrentTimer();

const cardsSpan = ref({
  xs: { span: 24 },
  lg: { span: 12 },
  xl: { span: 8 },
})
</script>

<template>
  <main>
    <a-row :gutter="[16,16]" wrap>
      <a-col v-bind="cardsSpan">
        <a-card title="Пользователь">
          <User></User>
        </a-card>
      </a-col>

      <a-col v-bind="cardsSpan">
        <a-card title="Месяц">
          <MonthCalculations></MonthCalculations>
        </a-card>
      </a-col>

      <a-col v-bind="cardsSpan">
        <a-card title="День">
          <DayCalculations></DayCalculations>
        </a-card>
      </a-col>

      <a-col v-bind="cardsSpan">
        <a-card title="Рассчёт зп">
          <calculator></calculator>
        </a-card>
      </a-col>
    </a-row>
  </main>
</template>
