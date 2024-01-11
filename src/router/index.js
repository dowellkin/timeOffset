import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requireLoggedIn: true,
      },
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/story",
      name: "story",
      meta: {
        requireLoggedIn: true,
      },
      component: () => import("../views/StoryView.vue"),
    },
  ],
});

export default router
