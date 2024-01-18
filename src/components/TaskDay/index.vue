<script setup>
import { computed } from 'vue'
import LogoAsana from "@/components/icons/asana.vue"
import hours from "@/packages/hours/index.js";
import { getDateString } from "@/utils.js";
import { ToolOutlined } from "@ant-design/icons-vue";

const currentTimeZoneOffsetInHours = new Date().getTimezoneOffset() / 60
const SERVER_HOURS_OFFSET = -currentTimeZoneOffsetInHours;

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

const prettyDate = computed(() => {
  return getDateString(new Date(props.day))
})

const totalTime = computed(() => {
  return hours(props.tasks.reduce((a,b) => a + b.time, 0) / 60)
})

const dataToShow = computed(() => {
  if(props.collapsed) return props.tasks

  const copyTasks = [...props.tasks]
  const histories = copyTasks.reduce((acc, cur) => {
    const resArr = []
    cur.rawHistory.forEach(historyItem => {
      resArr.push({
        data: cur.data,
        asanaLink: cur.asanaLink,
        name: cur.name,
        time: historyItem.time,
        createdAt: new Date(historyItem.createdAt),
        endedAt: new Date(new Date(historyItem.createdAt).getTime() + historyItem.time * 1000),
        action: historyItem.action
      })
    })
    return [...acc, ...resArr]
  }, [])

  histories.sort((a,b) => {
    return a.createdAt - b.createdAt
  })

  return histories
})

function getLocalTime(time) {
  return String(time.getHours() + SERVER_HOURS_OFFSET).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0')
}
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
              <a-tooltip
                v-if="item.action === 'EDIT'"
                placement="top"
              >
                <template #title>Изменено менеджером</template>

                <ToolOutlined class="mr-5"/>
              </a-tooltip>
              
              <a :href="item.asanaLink" target="_blank">
                <LogoAsana class="mr-5"/>
                {{ item.name }}
              </a>
            </template>

            <template #avatar>
              <div class="time-wrapper" :class="{ 'negative': item.time < 0 }">
                <template v-if="collapsed">
                  {{ hours(item.time / 60) }}
                </template>

                <a-tooltip
                  v-else
                  placement="bottom"
                >
                  <template #title>
                    <div class="time-grid">
                      <div>
                        Начал:
                      </div>
  
                      <div>
                        {{ getLocalTime(item.createdAt) }}
                      </div>
  
                      <div>
                        Закончил:
                      </div>
  
                      <div>
                        {{ getLocalTime(item.endedAt) }}
                      </div>
                    </div>
                  </template>

                  {{ hours(item.time / 60) }}
                </a-tooltip>
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
  min-width: 60px;
  text-align: right;
}

.time-wrapper.negative {
  color: var(--color-red-600)
}

.time-wrapper.negative::before {
  content: '-'
}

.mr-5 {
  margin-right: 5px;
}

.time-grid {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  gap: 5px 10px;
  padding: 5px 10px;
}
</style>