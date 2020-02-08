<template>
  <transition
  name="fade-in-down"
  mode="out-in"
  >
    <slot></slot>
  </transition>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { TimelineMax } from 'gsap';


import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import VueRouter, { Route } from 'vue-router';

@Component
export default class RouteChnage extends Vue {
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    // console.log(newVal);
  }

  // --------
  // ПОЯВЛЕНИЕ
  // --------

  beforeEnter(el: HTMLElement) {
    // el.style.cssText = 'opacity: 0; transform: scale(0.95); tranform-origin: 50% 50%';
  }

  // коллбэк done не обязательно использовать, если
  // анимация или переход также определены в CSS
  enter(el: HTMLElement, done: any) {
    // el.style.transform = 'translateX(100%)';
    const tl = new TimelineMax({ onComplete: done });
    tl.fromTo(el, 0.3, { y: -100, opacity: 1 }, { y: 0, opacity: 1 });
  }

  afterEnter(el: HTMLElement) {
    // el.style.transform = 'translateX(100%)';
    // el.style.cssText = '';
  }

  enterCancelled(el: HTMLElement) {
    // ...
  }

  // --------
  // ИСЧЕЗНОВЕНИЕanimateToPageMobile
  // --------

  beforeLeave(el: any) {
    // ...
    // el.style.cssText = 'transform: translateX(0);';
  }

  // коллбэк done не обязательно использовать, если
  // анимация или переход также определены в CSS
  leave(el: HTMLElement, done: any) {
    const tl = new TimelineMax({ onComplete: done });
    tl.fromTo(el, 0.3, { y: 0, opacity: 1 }, { y: 100, opacity: 1 });
  }

  afterLeave(el: HTMLElement) {
    // el.style.cssText = 'transform: translateX(100%);';
    // el.style.cssText = '';
  }

  // leaveCancelled доступна только для v-show
  leaveCancelled(el: HTMLElement) {
    // ...
  }
}
</script>

<style lang="scss">
.page-enter-active, .page-leave-active {
  transition: all 0.25s ease-out;
}

.page-enter, .page-leave-active {
  opacity: 0;
  transform: translateX(100%);
  transform-origin: 50% 50%;
}

@keyframes fadeInDown {
  from {
    transform: translate3d(0, -40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.fade-in-down-leave-to {
  transition: opacity .3s;
}

.fade-in-down-enter {
  transform: translate3d(0, -40px, 0);
}

.fade-in-down-enter-to {
  animation-duration: .7s;
  animation-fill-mode: both;
  animation-name: fadeInDown;
}
</style>
