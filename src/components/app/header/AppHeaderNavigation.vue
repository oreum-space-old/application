<template>
  <template v-if="app.menu === 'disabled'">
    <nav
      class="app-header-navigation"
      role="navigation"
    >
      <UiMenuBar :items="headerMenu" />
    </nav>
    <slot />
  </template>
  <template v-else>
    <button
      class="app-menu__button ui-menu-bar__button"
      @click="app.toggleMenu"
    >
      Меню
    </button>
    <teleport
      to="body"
    >
      <nav
        class="app-menu"
        :class="{ 'app-menu_shown': app.menu === 'shown' }"
        @click="appMenuClickHandler"
      >
        <slot />
        <UiMenuBar
          :items="headerMenu"
          column
        />
      </nav>
    </teleport>
  </template>
</template>

<script
  setup
  lang="ts"
>
import UiMenuBar from '@/components/ui/UiMenuBar.vue'
import headerMenu from '@/options/headerMenu'
import useApp from '@/stores/app'

const app = useApp()

function appMenuClickHandler (event: PointerEvent) {
  if (event.offsetX < 0 && app.menu === 'shown') {
    app.menu = 'hidden'
  }
}
</script>

<style lang="scss">
.app-header-navigation {
  display: flex;
  align-items: center;
}

.app-menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 256px;
  height: calc(var(--vhf) - 48px);
  top: 48px;
  right: 0;
  --background-color: var(--surface-card);
  background-color: var(--background-color);
  z-index: 10;
  translate: 100% 0;
  transition: translate 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  padding: 8px;
  gap: 8px;

  .app-header-auth {
    flex-flow: column;
    gap: 8px;
    flex: unset;

    button {
      width: 100%;
    }
  }

  &_shown {
    translate: 0 0;

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      translate: -100% 0;
      width: 100vw;
      height: 100%;
      background-color: #000000a8;
      animation: opaque 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    }
  }

  &__button {
    position: absolute;
    z-index: 11;
    right: 6px;
  }
}

@keyframes opaque {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
