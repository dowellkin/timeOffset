<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
  import {useCalendarStore} from "@/stores/calendar.js";
  const calendar = useCalendarStore(); 
  calendar.init()
  .then(data => {
    console.log(data);
  })
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
