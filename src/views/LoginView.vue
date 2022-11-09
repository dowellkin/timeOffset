<template>
  <div>
    <p>
      get API Token at 
      <a href="https://app.everhour.com/#/account/profile" target="__blank">your everhour profile</a>.
    </p>
    <loginForm @submit="formSubmit"/>
  </div>
</template>

<script setup>
import loginForm from "@/components/loginForm.vue"
import { useEHourStore } from "@/stores/everhour.js";
import { useRouter } from 'vue-router'
const EHstore = useEHourStore();
const router = useRouter();

const formSubmit = (data) => {
  console.log(data);
  EHstore.setToken(data.token);
  EHstore.me()
  .then(() => {
    router.push({name: 'home'});
  })
}
</script>

<style>

</style>