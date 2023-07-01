<script setup>
import SalaryCalculator from "@/components/SalaryCalculator.vue"
import MonthCalculations from "@/components/MonthCalculations.vue"
import DayCalculations from "@/components/DayCalculations.vue"
import UserCard from "@/components/UserCard.vue";
import CustomCard from "@/components/CustomCard.vue";
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
  xl: { span: 12 },
})
</script>

<template>
  <main>
    <div class="container">
      <a-row :gutter="[16,16]" wrap>
        <a-col :span="24" class="show-lg">
          <a-card class="user-card">
            <UserCard></UserCard>
          </a-card>
        </a-col>
  
        <a-col v-bind="cardsSpan">
          <CustomCard title="Кол-во часов за месяц">
            <MonthCalculations></MonthCalculations>
          </CustomCard>
        </a-col>
  
        <a-col v-bind="cardsSpan">
          <CustomCard title="Кол-во часов за сегодня">
            <DayCalculations></DayCalculations>
          </CustomCard>
        </a-col>
  
        <a-col v-bind="cardsSpan">
          <CustomCard title="Рассчёт зп">
            <SalaryCalculator></SalaryCalculator>
          </CustomCard>
        </a-col>
      </a-row>
    </div>
  </main>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.user-card .ant-card-body {
  padding-top: rem(20);
  padding-bottom: rem(20);
}
</style>