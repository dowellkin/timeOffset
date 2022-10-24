<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import EHapi from "@/packages/everHourAPI";
import {useCalendarStore} from "@/stores/calendar.js";

EHapi.setToken('');
EHapi.me()
  .then(res => {
    console.log(res)
    const id = res.id;

    EHapi.time(id, {
      from: new Date(new Date().setDate(1)),
      to: lastMonthDay()
    })
    .then(console.log)
  })

const calendar = useCalendarStore();
calendar.init();


function lastMonthDay() {
  const date = new Date();
  const currentmonth = date.getMonth();
  const nextmonth = currentmonth + 1;
  const nextmonthfirstday = new Date(date.getFullYear(), nextmonth, 1);
  const oneday = 1 * 24 * 3600 * 1000;
  const lasttime = new Date(nextmonthfirstday-oneday);
  console.log(lasttime)
  return lasttime;
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a-button> hello </a-button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
