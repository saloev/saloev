<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
    :css="false"
  >
    <router-view></router-view>
  </transition>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */

import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import VueRouter, { Route } from 'vue-router';

import debounce from '@/utils/debounce';

@Component
export default class RouteChnage extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    // console.log(newVal);
  }

  // DATA
  currentRoute: number = 0;

  allRoutes: Array<{ name: string | undefined; path: string }> = [];

  timeoutFunctions: null | number = null;

  lastScrolledPosition: number = 0;

  // --------
  // ПОЯВЛЕНИЕ
  // --------

  beforeEnter(el: any) {}

  // коллбэк done не обязательно использовать, если
  // анимация или переход также определены в CSS
  enter(el: any, done: any) {
    // ...
    done();
  }

  afterEnter(el: any) {
    // ...
  }

  enterCancelled(el: any) {
    // ...
  }

  // --------
  // ИСЧЕЗНОВЕНИЕ
  // --------

  beforeLeave(el: any) {
    // ...
  }

  // коллбэк done не обязательно использовать, если
  // анимация или переход также определены в CSS
  leave(el: any, done: any) {
    // ...
    done();
  }

  afterLeave(el: any) {
    // ...
  }

  // leaveCancelled доступна только для v-show
  leaveCancelled(el: any) {
    // ...
  }

  callFuncWithDelay(func: Function) {
    if (this.timeoutFunctions) return;

    this.timeoutFunctions = setTimeout(() => {
      func();
      this.timeoutFunctions = null;
    }, 500);
  }

  changeRoute(direction: 'up' | 'down'): void {
    const dispatchRouteDirection: {
      up: Function;
      down: Function;
    } = {
      down: () => {
        this.currentRoute = this.currentRoute + 1 <= this.allRoutes.length - 1
          ? this.currentRoute + 1
          : this.allRoutes.length - 1;
      },
      up: () => {
        this.currentRoute = this.currentRoute - 1 >= 0 ? this.currentRoute - 1 : 0;
      },
    };

    dispatchRouteDirection[direction]();
    const { name, path } = this.allRoutes[this.currentRoute];

    if (!name) {
      if (this.$route.path === path) return;
      this.$router.push({ path });
      return;
    }

    if (this.$route.name === name) return;

    this.$router.push({ name });
  }

  onScroll(e: Event): void {
    const func = () => {
      const newScrolledPosition: number = document.body.getBoundingClientRect().top;
      const dir = this.lastScrolledPosition > newScrolledPosition ? 'down' : 'up';
      this.lastScrolledPosition = newScrolledPosition;
      this.changeRoute(dir);
    };


    this.callFuncWithDelay(func);
  }

  onKeyUp(e: KeyboardEvent): void {
    const func = () => {
      const dispatchRouteDirection: {
        ArrowUp: 'up';
        ArrowDown: 'down';
      } = {
        ArrowUp: 'up',
        ArrowDown: 'down',
      };

      const dir: 'up' | 'down' | undefined = dispatchRouteDirection[e.key] || 'up';

      if (!dir) return;

      this.changeRoute(dir);
    };

    this.callFuncWithDelay(func);
  }

  onWhell(e: WheelEvent): void {
    const { deltaY } = e;
    const func = () => {
      const dir = deltaY > 0 ? 'down' : 'up';
      this.changeRoute(dir);
    };
    this.callFuncWithDelay(func);
  }

  saveRoutes() {
    const { options } = this.$router;
    options.routes.forEach((route: Route) => {
      this.allRoutes.push({
        name: route.name,
        path: route.path,
      });
    });
  }

  bindEvents() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('wheel', this.onWhell);
  }

  destroyEvents() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('wheel', this.onWhell);
  }

  created() {
    this.saveRoutes();
  }

  mounted() {
    this.bindEvents();
  }

  destroyed() {
    this.destroyEvents();
  }
}
</script>
