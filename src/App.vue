<script setup>
import CurrentDay from "@/components/CurrentDay.vue";
import UserInfo from "@/components/UserInfo.vue";
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue';

import { useCalendarStore } from "@/stores/calendar.js";
import { useEHourStore } from "@/stores/everhour.js";

// должно переключать язык на русский и ставить понедельник первым днём недели, но не тут то было...
import "dayjs/locale/ru";
import locale from 'ant-design-vue/es/locale/ru_RU';

const router = useRouter();
const EHstore = useEHourStore();
EHstore.init();

if(EHstore.loggedIn) {
  const calendar = useCalendarStore();
  calendar.init();

  EHstore.getMonthTasks();
  EHstore.getCurrentTimer();
}



router.beforeEach(async (to, from, next) => {
  if(to.meta.requireLoggedIn && !EHstore.loggedIn) next({name: 'login'})
  else if (to.name == 'login' && EHstore.loggedIn) next({name: 'home'})
  else next()
})

const selectedKeys = computed(() => {
  return [useRoute().name]
});
</script>

<template>
  <a-config-provider :locale="locale">
    <a-layout class="layout">
      <a-layout-header>
        <div class="header-content__wrapper">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item v-if="!EHstore.loggedIn" key="login" @click="router.push({name: 'login'})">
              Вход
            </a-menu-item>
    
            <a-menu-item v-if="EHstore.loggedIn" key="home" @click="router.push({name: 'home'})">
              Данные пользователя
            </a-menu-item>

            <a-menu-item v-if="EHstore.loggedIn" key="story" @click="router.push({name: 'story'})">
              История
            </a-menu-item>
          </a-menu>

          <template v-if="EHstore.loggedIn">
            <CurrentDay class="header-content__day hide-lg-flex">
            </CurrentDay>
    
            <UserInfo class="header-content__user hide-lg-flex">
            </UserInfo>
          </template>
        </div>
      </a-layout-header>

      <a-layout-content class="layout-content">
        <div class="main-content__wrapper">
          <router-view />
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Timcher ©{{ new Date().getFullYear() }} Created by Alexandr Korolev
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<style scoped>
.layout-content {
  padding: 0 50px;
}

@media (max-width: 768px) {
  .layout-content {
    padding: 0 25px;
  }
}

@media (max-width: 576px) {
  .layout-content {
    padding: 0 10px;
  }
}

.ant-layout {
  min-height: 100%;
  background-color: var(--color-black-100);
  transition: background-color .5s ease;
}

.ant-layout-footer{
  background-color: var(--color-black-100);
  color: var(--color-text);
  transition: background-color .5s ease,
              color .5s ease;
}

.main-content__wrapper {
  min-height: 280px;
  transition: background-color .5s ease;
}

.header-content__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

.header-content__day {
  justify-self: center;
}

.header-content__user {
  justify-self: end;
}
</style>
