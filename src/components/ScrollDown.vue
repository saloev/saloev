<template>
  <div
    class="scroll-down
  position--fixed
  position--center-x
  display--flex
  flex-justify--center
  flex-align--center
  animation--rainbow-border-color
  scroll-down
  "
  >
    <span class="scroll-down__icon animation--scroll-down"></span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScrollDown extends Vue {}
</script>
<style lang="scss" scoped>
.scroll-down {
  bottom: 50px;

  &__icon {
    width: 5vw;
    height: 5vw;
    margin-left: -50%;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
}
</style>
