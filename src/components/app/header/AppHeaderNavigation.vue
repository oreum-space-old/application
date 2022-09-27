<template>
  <nav
    class="app-header-navigation"
    role="navigation"
  >
    <UiMenuBar :items="headerMenu" />
  </nav>
</template>

<script
  setup
  lang="ts"
>
import UiMenuBar from '@/components/ui/UiMenuBar.vue'
import headerMenu from '@/options/headerMenu'
</script>

<style
  lang="scss"
  scoped
>
.app-header-navigation {
  display: flex;
  align-items: center;
}
</style>
