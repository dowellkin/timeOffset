<script setup>
import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";
import { map, Hours } from "@/utils.js"
import { computed } from "vue"
import { LoadingOutlined } from '@ant-design/icons-vue';

const calendar = useCalendarStore();
calendar.init();

const EHstore = useEHourStore();
EHstore.getMonthTasks();
EHstore.getCurrentTimer();

const loading = computed(() => {
  return EHstore.isLoading || calendar.isLoading;
});

const hours = computed(() => {
  console.log(EHstore.hours);
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

</script>

<template>
  <main v-if="!loading">
    <a-row :gutter="[16,16]">
      <a-col>
        <a-avatar :src="EHstore.self.avatarUrlLarge" :size="128" />
      </a-col>

      <a-col>
        <a-typography-title :level="2">
          {{EHstore.self.name}}
        </a-typography-title>

        <a-typography-text :level="5" type="secondary">
          {{EHstore.self.headline}}@{{EHstore.self.team.name}}
        </a-typography-text>
      </a-col>
    </a-row>

    <p>
      разница: 
      <a-tag :color="bias.toNumber() < 0 ? 'red' : 'green'">
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
  </main>
  <div v-else>
    <loading-outlined style="font-size: 128px" />
  </div>
</template>
