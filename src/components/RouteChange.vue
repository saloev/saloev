<template>
  <animate-route>
    <router-view></router-view>
  </animate-route>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */

import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import VueRouter, { Route } from 'vue-router';

import AnimateRoute from './AnimateRouteChange.vue';

@Component({
  components: {
    AnimateRoute,
  },
})
export default class RouteChnage extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    // console.log(newVal);
  }

  // DATA
  currentRouteIndex: number = 0;

  allRoutes: Array<{ name: string | undefined; path: string }> = [];

  timeoutFunctions: null | number = null;

  lastScrolledPosition: number = 0;

  callFuncWithDelay(func: Function): void {
    if (this.timeoutFunctions) {
      clearTimeout(this.timeoutFunctions);
    }

    this.timeoutFunctions = setTimeout(() => {
      func();
    }, 500);
  }

  changeRoute(direction: 'up' | 'down'): void {
    const dispatchRouteDirection: {
      up: Function;
      down: Function;
    } = {
      down: () => {
        this.currentRouteIndex = this.currentRouteIndex + 1 <= this.allRoutes.length - 1
          ? this.currentRouteIndex + 1
          : this.allRoutes.length - 1;
      },
      up: () => {
        this.currentRouteIndex = this.currentRouteIndex - 1 >= 0 ? this.currentRouteIndex - 1 : 0;
      },
    };

    dispatchRouteDirection[direction]();
    const { name, path } = this.allRoutes[this.currentRouteIndex];

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


      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      const dir: 'up' | 'down' = dispatchRouteDirection[e.key] || 'up';

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

  saveRoutes(): void {
    // @ts-ignore
    const { options } = this.$router;
    const [routes] = options.routes;
    const { children } = routes;
    children.forEach((route: Route) => {
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

  beforeDestroy() {
    this.destroyEvents();
  }
}
</script>
