<script setup>
import { useEHourStore } from "@/stores/everhour.js";
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter();

const EHstore = useEHourStore();
EHstore.init();

console.log(EHstore)
router.beforeEach(async (to, from, next) => {
  if(to.meta.requireLoggedIn && !EHstore.loggedIn) next({name: 'login'})
  else if (to.name == 'login' && EHstore.loggedIn) next({name: 'home'})
  else next()
})

const logout = () => {
  EHstore.$reset()
  router.push({name: 'login'})
}

const selectedKeys = ref(['1']);
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
        <a-menu-item key="1">
          {{EHstore.loggedIn ? 'Data' : 'Login'}}
        </a-menu-item>
        <a-menu-item v-if="EHstore.loggedIn" key="logout" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
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
}
</style>
