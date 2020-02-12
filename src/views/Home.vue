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
import { State, Action, Getter } from 'vuex-class';
import { Animation as typeAnimation } from '@/types/store/types';

import Animation from '@/utils/animation';

import Intro from '@/components/home/Intro.vue';
import ScrollDown from '@/components/ScrollDown.vue';

const namespace: string = 'animation';

@Component({
  components: {
    Intro,
    ScrollDown,
  },
})
export default class Home extends Vue {
  @Action('setDomList', { namespace }) setDomList: any;

  animateAppearence(): void {
    const intor = ((this.$refs.intro as Vue).$el as Element);
    const scroll = ((this.$refs.scroll as Vue).$el as Element);
    const arr: Array<Element> = [
      intor,
      scroll,
    ];
    Animation.animateArrayOfElements(arr);

    this.setDomList(arr);
  }

  mounted() {
    this.animateAppearence();
  }
}
</script>

<style lang="scss">
.home {}
</style>
