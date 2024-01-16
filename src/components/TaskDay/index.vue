<script setup>
import { computed, onMounted } from 'vue'
import LogoAsana from "@/components/icons/asana.vue"
import hours from "@/packages/hours/index.js";
import { getDateString } from "@/utils.js";
import { LinkOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  'tasks': {
    type: Array,
    default: () => ([])
  },
  'day': {
    type: String,
    default: () => ('')
  },
  'collapsed': {
    type: Boolean,
    default: () => (false)
  }
})

onMounted(() => {
  console.log(props.tasks)
})

const prettyDate = computed(() => {
  return getDateString(new Date(props.day))
})

const totalTime = computed(() => {
  return hours(props.tasks.reduce((a,b) => a + b.time, 0) / 60)
})

const dataToShow = computed(() => {
  if(props.collapsed) return props.tasks

  return props.tasks
})
</script>

<template>
  <div class="day">
    <h3>
      {{ totalTime }}: {{ prettyDate }}
    </h3>
    <a-list item-layout="horizontal" :data-source="dataToShow">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            :description="item.data.task.iteration || ''"
          >
            <template #title>
              <a :href="item.asanaLink" target="_blank">
                <LogoAsana class="title-logo"/>
                {{ item.name }}
              </a>
            </template>

            <template #avatar>
              <div class="time-wrapper">
                {{ hours(item.time / 60) }}
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
  export default {
    name: 'TaskList',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<style scoped>
.time-wrapper {
  min-width: 55px;
}

.title-logo {
  margin-right: 5px;
}
</style>