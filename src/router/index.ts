import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
    {
      path: "/contact/:id",
      component: () => import("@/views/ContactView.vue"),
    },
    {
      path: "/contact/new",
      name: "newContact",
      component: () => import("@/views/NewContactView.vue"),
    },
  ],
});

export default router;
