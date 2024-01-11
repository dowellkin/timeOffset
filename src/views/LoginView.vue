<template>
  <div class="login-view">
    <a-card>
      <loginForm @submit="formSubmit"/>
    </a-card>
  </div>
</template>

<script setup>
import loginForm from "@/components/loginForm.vue"
import { useEHourStore } from "@/stores/everhour.js";
import { useRouter } from 'vue-router'
const EHstore = useEHourStore();
const router = useRouter();

const formSubmit = (data) => {
  EHstore.setToken(data.token);
  EHstore.me()
  .then(() => {
    router.push({name: 'home'});
  })
}
</script>

<style>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>