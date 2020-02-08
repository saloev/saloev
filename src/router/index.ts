import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import routes from './routes';

import Animation from '@/utils/animation';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

  routes,
});

export default router;

const scrollToTop = () => {
  window.scrollTo({
    behavior: 'auto', // 'smooth',
    left: 0,
    top: 0,
  });
};

// const animateAppearence = (): void {
//   const arr = [
//     this.$refs.intro.$el,
//     this.$refs.scroll.$el,
//   ];
//   Animation.animateArrayOfElements(arr);
// }

router.beforeEach((to: Route, from: Route, next: Function) => {
  console.log(from);
  next();
});

router.afterEach((to: Route, from: Route) => {
  // scrollToTop();
});
