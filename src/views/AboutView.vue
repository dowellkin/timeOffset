<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2 @click="store.increment">count is {{":"}} {{store.count}}</h2>
  </div>
</template>

<script setup>
  import {useCounterStore} from "@/stores/counter.js";
  const store = useCounterStore(); 
  console.log(store.count)
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
