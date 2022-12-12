<script setup>
import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";
import { map, Hours } from "@/utils.js"
import { computed } from "vue"
import { LoadingOutlined } from '@ant-design/icons-vue';
import _ from "lodash"

const calendar = useCalendarStore();
calendar.init();

const EHstore = useEHourStore();
updateClock();

const loading = computed(() => {
  return EHstore.isLoading || calendar.isLoading;
});

const hours = computed(() => {
  return Math.floor(EHstore.hours);
})
const minutes = computed(() => {
  return Math.round(map(EHstore.hours % 1, 0, 1, 0, 60));
})

const workingHours = computed(() => {
  if(!calendar.calendar) return 0
  const month = new Date().getMonth();
  return calendar.calendar[month].meta.hours;
})

const tracked = computed(() => {
  return Hours(EHstore.hours * 60)
})

const bias = computed(() => {
  const h = Hours(calendar.hourForNow * 60)
  return tracked.value.sub(h);
})

const todayHours = computed(() => {
  return Hours(EHstore.todayHours * 60)
})

const todayBias = computed(() => {
  const h = Hours(8 * 60)
  return todayHours.value.sub(h);
})

function updateClock() {
  EHstore.getMonthTasks();
  EHstore.getCurrentTimer();
}

const updateClockThrottled = _.throttle(updateClock, 1000)

</script>

<template>
  <main>
    <a-row :gutter="[16,16]" type="flex" wrap>
      <a-col>
        <a-avatar v-if="!loading" :src="EHstore.self.avatarUrlLarge" :size="128" />
        <a-skeleton-avatar v-else active :size="128"/>
      </a-col>

      <a-col flex="auto">
        <template v-if="!loading">
          <a-typography-title :level="2">
            {{EHstore.self.name}}
          </a-typography-title>
          
          <a-typography-text :level="5" type="secondary">
            {{EHstore.self.headline}}@{{EHstore.self.team.name}}
          </a-typography-text>
        </template>
        <a-skeleton v-else active :paragraph="{ rows: 2 }" />
      </a-col>
    </a-row>

    <template v-if="!loading">
      <p>
        разница: 
        <a-tag :color="bias.toNumber() < 0 ? 'red' : 'green'" @click="updateClockThrottled">
          {{bias}}
        </a-tag>
      </p>

      <p>
        оттрекано: {{tracked.toString()}}
      </p>
      <p>
        должно быть оттрекано к концу дня: {{calendar.hourForNow}}h
      </p>
      <p>
        часов в месяце: {{workingHours}}h
      </p>

      <p>
        оттрекано за сегодня {{ todayHours }}
      </p>

      <p>
        осталось на сегодня
        <a-tag :color="todayBias.toNumber() < 0 ? 'red' : 'green'" @click="updateClockThrottled">
          {{ todayBias }}
        </a-tag>
      </p>
    </template>
    <a-skeleton v-else active :paragraph="{ rows: 6 }" />
  </main>
</template>
