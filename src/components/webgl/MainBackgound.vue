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
  resizeTimeoute: number | null = null;

  get canvas(): HTMLCanvasElement {
    return (this.$refs as any).canvas as HTMLCanvasElement;
  }

  mounted() {
    this.bindEvents();
  }

  beforeDestroy() {
    this.destroyEvents();
  }

  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  showError(err: string | null): Error {
    if (err === null) throw Error('Empty error');
    throw Error(err);
  }

  compileShaderStatus(gl: WebGLRenderingContext, shader: WebGLShader) {
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const errors = gl.getShaderInfoLog(shader);
      this.showError(errors);
    }
  }

  setCanvasSize(): void {
    const { canvas } = this;
    if (!canvas) return;

    if (this.resizeTimeoute) {
      clearTimeout(this.resizeTimeoute);
    }

    this.resizeTimeoute = setTimeout(() => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 500);
  }

  /**
   * Init WebGL
   * @see https://www.youtube.com/watch?time_continue=202&v=_ZQOUQsw_YI&feature=emb_logo
   */
  init(): void {
    this.setCanvasSize();
    const gl: WebGLRenderingContext | null = this.canvas.getContext('webgl');
    if (!gl) {
      console.error("Can't create WebGLRenderingContext");
      return;
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set up shaders
    const vertextShader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader: WebGLShader | null = gl.createShader(
      gl.FRAGMENT_SHADER,
    );

    if (!vertextShader || !fragmentShader) {
      console.error("Can't create a shaders");
      return;
    }

    gl.shaderSource(vertextShader, vs);
    gl.shaderSource(fragmentShader, fs);
    gl.compileShader(vertextShader);
    gl.compileShader(fragmentShader);
    this.compileShaderStatus(gl, vertextShader);
    this.compileShaderStatus(gl, fragmentShader);

    // compile program ???
    const program: WebGLProgram | null = gl.createProgram();
    if (!program) {
      this.showError("Can't create WebGL program");
      return;
    }

    gl.attachShader(program, vertextShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // Check for success
    const linked: any = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      const err: string | null = gl.getProgramInfoLog(program);
      this.showError(`Can't link WebGL program, ${err}`);
    }
    // console.log(program, vs, fs);
    gl.useProgram(program);

    // triangle coordinates
    const vietices: Float32Array = new Float32Array([
      -1,
      -1,
      -1,
      1,
      1,
      1,

      -1,
      -1,
      1,
      1,
      1,
      -1,
    ]);

    const vertexBuffer: WebGLBuffer | null = gl.createBuffer();
    if (!vertexBuffer) {
      console.error("Can't create vertexBuffer");
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vietices, gl.STATIC_DRAW);

    // get id for variable
    const positionLocation: number = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  bindEvents() {
    this.init();
    window.addEventListener('resize', this.setCanvasSize);
  }

  destroyEvents() {
    window.removeEventListener('resize', this.setCanvasSize);
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
