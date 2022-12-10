<script setup>
import calculator from "@/components/Calculator.vue"
import { computed } from "vue"
import { useEHourStore } from "@/stores/everhour.js";
import { LoadingOutlined } from '@ant-design/icons-vue';
const EHstore = useEHourStore();
EHstore.getMonthTasks();
EHstore.getCurrentTimer();

const loading = computed(() => {
  return EHstore.isLoading;
});
</script>

<template>
  <div class="calculator-view" v-if="!loading">
    <calculator/>
  </div>
  <div v-else>
    <loading-outlined style="font-size: 128px" />
  </div>
</template>