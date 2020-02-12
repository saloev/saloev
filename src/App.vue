<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RouteChange from '@/components/RouteChange.vue';


@Component({
  components: {
    RouteChange,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss"></style>
