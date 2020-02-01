<template>
  <div class="home height-min--100vh">
    <intro></intro>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Intro from '@/components/home/Intro.vue';

@Component({
  components: {
    Intro,
  },
})
export default class Home extends Vue {}
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
