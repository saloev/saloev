import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

const MainLayout = () => import(/* webpackChunkName: "Layout" */ '@/components/layout/MainLayout.vue');
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue');
const Projects = () => import(/* webpackChunkName: "Projects" */ '@/views/Projects.vue');
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/projects',
        name: 'projects',
        component: Projects,
      },
    ],
  },
];

export default routes;
