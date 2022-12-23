<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue';

const router = useRouter();
const EHstore = useEHourStore();
EHstore.init();

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
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-if="!EHstore.loggedIn" key="login" @click="router.push({name: 'login'})">
          Login
        </a-menu-item>

        <a-menu-item v-if="EHstore.loggedIn" key="home" @click="router.push({name: 'home'})">
          Data
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content class="layout-content">
      <a-breadcrumb style="margin: 16px 0">
      </a-breadcrumb>

      <div class="main-content__wrapper">
        <router-view />
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Timcher ©2022 Created by Alexandr Korolev
    </a-layout-footer>
  </a-layout>
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
  background-color: var(--color-background-mute);
  transition: background-color .5s ease;
}

.ant-layout-footer{
  background-color: var(--color-background-mute);
  color: var(--color-text);
  transition: background-color .5s ease,
              color .5s ease;
}

.main-content__wrapper {
  min-height: 280px;
  transition: background-color .5s ease;
}
</style>
