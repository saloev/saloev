<template>
  <header>
    <nav
      class="
    main-nav
    position--fixed
    width--100
    padding--25
    "
    >
      <ul
        class="
        main-nav__list
        reset--list
        padding--0
        display--flex
        flex-justify--between
        "
      >
        <li
          class="main-nav__item"
          v-for="(item, index) in menuList"
          :key="`menu-item-${index}`"
        >
          <router-link
            :to="item.path"
            class="main-nav__link
          position--relative
          display--block
          overflow--hidden
          text-decoration--none
          color--iris-blue
          "
            data-link="To home page"
            ><span class="main-nav__link-text">{{
              item.name
            }}</span></router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MainLayout extends Vue {
  menuList: Array<{
    name: string;
    path: string;
  }> = [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'about',
      path: '/about',
    },
  ];
}
</script>
<style lang="scss">
.main-nav {
  &__link {
    font-size: 2vw;
    line-height: calc(2vw + 5px);

    &::after,
    &::before {
      content: "";
      position: absolute;

      display: block;
      height: calc(2vw / 8);
      width: 100%;

      background: var(--color-gold);

      transition: transform 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55);

      will-change: transform;
    }

    &::before {
      right: 0;
      bottom: 0;

      transform: translateX(-100%);
    }

    &::after {
      top: 0;
      left: 0;

      transform: translateX(100%);
    }

    &:hover,
    &:focus,
    &:active {
      &::after,
      &::before {
        transform:  translateX(0);
      }
    }
  }
}
</style>
