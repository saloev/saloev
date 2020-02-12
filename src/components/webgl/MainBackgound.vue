<template>
  <div class="main-background">
    <canvas class="main-background__canvas" id="canvas" ref="canvas"></canvas>
    <div class="main-background__content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

// LOAD SHADERS
// @ts-ignore
import fs from './shaders/fragment.glsl';
// @ts-ignore
import vs from './shaders/vertex.glsl';

@Component
export default class MainBackground extends Vue {
  canvas: HTMLCanvasElement | null = null;

  setCanvasSize() {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    this.canvas = ((this.$refs as any).canvas as HTMLCanvasElement);
    window.addEventListener('resize', this.setCanvasSize);
  }

  destroyEvents() {
    window.removeEventListener('resize', this.setCanvasSize);
  }

  // created() {
  // }

  mounted() {
    this.bindEvents();
  }

  destroyed() {
    this.destroyEvents();
  }
}
</script>
<style lang="scss">
.main-background {
  position: relative;
  width: 100vw;
  height: 100vh;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100vw;
    height: 100vh;
  }

  &__content {
    position: relative;
    z-index: 10;
  }
}
</style>
