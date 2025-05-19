import { createRouter, createWebHistory } from "vue-router"; // ✅ change here
import SliderOne from "../pages/SliderOne.vue";
import SliderTwo from "../pages/SliderTwo.vue";
import LoadDrawn from "../pages/LoadDrawn.vue";

const routes = [
  {
    path: "/",
    name: "slider-default",
    component: SliderOne,
  },
  {
    path: "/slider-one",
    name: "slider-one",
    component: SliderOne,
  },
  {
    path: "/slider-two",
    name: "slider-two",
    component: SliderTwo,
  },
  {
    path: "/load-drawn",
    name: "load-drawn",
    component: LoadDrawn,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
