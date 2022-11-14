import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import HomeView from "../components/Home.vue";
import UsersView from "../components/Users.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    }
  ],
});

export default router;
