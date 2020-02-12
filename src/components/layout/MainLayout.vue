<template>
  <main-background>
    <div class="main-layout">
      <main-header></main-header>
      <main>
        <route-change></route-change>
      </main>
    </div>
  </main-background>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RouteChange from '@/components/RouteChange.vue';
import MainBackground from '@/components/webgl/MainBackgound.vue';
import MainHeader from './MainHeader.vue';

@Component({
  components: {
    RouteChange,
    MainHeader,
    MainBackground,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.main-layout {
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
