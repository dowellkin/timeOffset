<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, nextTick } from 'vue';

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

const logout = () => {
  EHstore.logout()
  EHstore.$reset()
  nextTick()
  .then(() => {
    selectedKeys.value = ['login'];
  })
  router.push({name: 'login'})
}

</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item :key="EHstore.loggedIn ? 'home' : 'login'" @click="router.push({name: EHstore.loggedIn ? 'home' : 'login'})">
          {{EHstore.loggedIn ? 'Data' : 'Login'}}
        </a-menu-item>
        <a-menu-item v-if="EHstore.loggedIn" key="calculator" @click="router.push({name: 'calculator'})">
          Calculator
        </a-menu-item>
        <a-menu-item v-if="EHstore.loggedIn" key="logout" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
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
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
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
  background-color: var(--color-background);
  padding: 24px;
  min-height: 280px;
  transition: background-color .5s ease;
}
</style>
