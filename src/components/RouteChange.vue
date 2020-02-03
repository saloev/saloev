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

@Component
export default class RouteChnage extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    console.log(newVal);
  }

  // DATA
  currentRoute: number = 0;

  allRoutes: Array<{ name: string; path: string }> = [];

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
    const { name } = this.allRoutes[this.currentRoute];

    if (this.$route.name === name) return;

    this.$router.push({ name });
  }

  onScroll(e: Event): void {}

  onKeyDown(e: KeyboardEvent): void {
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
  }

  onWhell(e: WheelEvent): void {}

  saveRoutes() {
    const { options } = this.$router;
    options.routes.forEach((route: Route) => {
      this.allRoutes.push({
        name: route.name || '/',
        path: route.path,
      });
    });
  }

  bindEvents() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('wheel', this.onWhell);
  }

  destroyEvents() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('keydown', this.onKeyDown);
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
