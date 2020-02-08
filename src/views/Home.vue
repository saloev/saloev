<template>
  <article
    ref="article"
    class="home
      height-min--100vh
      display--flex
      flex-justify--center
      flex-align--center
      text-align--center"
  >
    <intro ref="intro"></intro>
    <scroll-down ref="scroll"></scroll-down>
  </article>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */

import { Component, Prop, Vue } from 'vue-property-decorator';

import Animation from '@/utils/animation';

import Intro from '@/components/home/Intro.vue';
import ScrollDown from '@/components/ScrollDown.vue';

@Component({
  components: {
    Intro,
    ScrollDown,
  },
})
export default class Home extends Vue {
  animateAppearence(): void {
    const intor = ((this.$refs.intro as Vue).$el as Element);
    const scroll = ((this.$refs.scroll as Vue).$el as Element);

    const arr = [
      intor,
      scroll,
    ];
    Animation.animateArrayOfElements(arr);
  }

  mounted() {
    this.animateAppearence();
  }
}
</script>

<style lang="scss">
.home {
  background-position: center;
  background-size: cover;
  background-image: url($assets+"/home-bg.jpeg"),
    linear-gradient(
      180deg,
      rgba(8, 15, 26, 0.59) 0%,
      rgba(17, 17, 46, 0.46) 100%
    );
  background-blend-mode: multiply;
}
</style>
