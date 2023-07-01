<script setup>
import { computed, ref } from "vue"
import { useEHourStore } from "@/stores/everhour.js";
import { useCalendarStore } from "@/stores/calendar.js";
import CustomChip from "@/components/CustomChip.vue";

const calendar = useCalendarStore();
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
  return Math.min(hours.value - h, 30);
})

const nowSalary = computed(() => {
  const mustWorking = +workingHours.value;
  const worked = Math.min(hours.value, mustWorking + 30);
  
  return worked * rate.value;
})

const biasSalary = computed(() => {
  const overpay = bias.value * rate.value;

  return +salary.value + overpay;
})

const loading = computed(() => {
  return EHstore.isLoading;
});
</script>

<template>
  <div class="salary-calculator">
    <div v-if="!loading" class="calculator">
      <div class="salary-calculator__title">
        Укажите вашу зарплату в $ за месяц:
      </div>

      <label class="salary-input__wrapper">
        <a-input class="salary-input" type="number" v-model:value="salary"></a-input>
      </label>

      <div class="salary-calculator__warning">
        Реальные значения могут отличаться, рассчитанные значения примерны.
      </div>
      
      <div class="row">
          <div class="row__title">
              Ваша зарплата за час:
          </div>

          <CustomChip class="row__value" prepend="$">{{ rate.toFixed(2) }}</CustomChip>
      </div>
      
      <div class="row">
          <div class="row__title">
              Ваша ЗП на сегодня:
          </div>

          <CustomChip class="row__value" prepend="$">{{ nowSalary.toFixed(2) }}</CustomChip>
      </div>
      
      <div class="row">
          <div class="row__title">
              Полная ЗП при переработках:
          </div>

          <CustomChip class="row__value" prepend="$">{{ biasSalary.toFixed(2) }}</CustomChip>
      </div>
    </div>
    <a-skeleton v-else :paragraph="{rows: 5}" :title="false" active></a-skeleton>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/mixins.scss" as *;

.salary-calculator {
  max-width: rem(520);

  &__title {
    margin-bottom: rem(17);
    font-weight: 500;
    font-size: rem(16);
  }

  &__warning {
    font-size: rem(12);
    color: var(--color-black-400);
    margin-bottom: rem(30);
    margin-top: rem(10);
  }
}

.salary-calculator .salary-input {
    display: block;
    padding: rem(15);
    padding-left: rem(30);
    border-radius: rem(5);
    font-size: rem(16);
    line-height: rem(20);
    color: var(--color-black-500);

    &:hover {
      border-color: var(--color-primary-600);
    }
    
    &:focus {
      border-color: var(--color-primary-600);
      box-shadow: 0 0 6px 0px var(--color-primary-400);
    }

    &__wrapper {
      position: relative;

      &::before {
        content: "$";
        position: absolute;
        z-index: 1;
        top: 50%;
        left: rem(15);
        transform: translateY(-50%);
        font-size: rem(16);
        line-height: 1;
        font-weight: 500;
        color: var(--color-black-600);
      }
    }
}
</style>