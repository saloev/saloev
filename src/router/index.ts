import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import store from '@/store/index';
import routes from './routes';


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

const animateLeavingRoute = (next: Function): void => {
  store.dispatch('animation/animatePageLeave')
    .then(() => {
      next();
    })
    .catch((e: any) => {
      console.error(e);
    });
};

router.beforeEach((to: Route, from: Route, next: Function): void => {
  const domList: Array<Element> = store.getters['animation/domList'];
  if (domList.length) return animateLeavingRoute(next);
  return next();
});

router.afterEach((to: Route, from: Route) => {
  // scrollToTop();
});
