<script setup>
import TaskDay from "@/components/TaskDay/index.vue";
import { Empty } from 'ant-design-vue';
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const props = defineProps({
  'task-list': {
    type: Object,
    default: () => ({})
  },
  'collapsed': {
    type: Boolean,
    default: () => (false)
  }
})

</script>

<template>
  <div class="task-list">
    <template v-if="Object.entries(props.taskList).length">
      <TaskDay
        v-for="[day, tasks] in Object.entries(props.taskList)"
        :key="day"
        :tasks="tasks"
        :day="day"
        :collapsed="collapsed"
      >
      </TaskDay>
    </template>
    
    <a-empty v-else :image="simpleImage" />
  </div>
</template>

<script>
  export default {
    name: 'TaskList',
    inheritAttrs: false,
    customOptions: {}
  }
</script>