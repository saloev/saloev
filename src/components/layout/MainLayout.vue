<template>
  <div class="main-layout">
    <main-header></main-header>
    <main>
      <route-change></route-change>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RouteChange from '@/components/RouteChange.vue';
import MainHeader from './MainHeader.vue';

@Component({
  components: {
    RouteChange,
    MainHeader,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
