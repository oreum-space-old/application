<!-- TODO: Удалить этот компонент так как его заменит UiMenuBar -->
<template>
  <div class="app-header-navigation-dropdown">
    <!--    <a
      class="app-header-navigation-dropdown"
      role="menuitem"
    >
      <ui-icon
        v-if="icon"
        :icon="icon"
      />
    </a>
    <ul role="menu">
      <li role="none">
        <a role="menuitem">

        </a>
      </li>
    </ul>-->
  </div>
</template>

<script
  setup
  lang="ts"
>
// import UiIcon from '@/components/ui/UiIcon.vue'

interface ItemRaw {
  icon: string,
  text: string
}

// interface ItemLink {
//   to: string
// }

interface ItemWithSubmenu extends ItemRaw {
  items: Item
}

type Item = ItemWithSubmenu

type Props = {
  items: Array<Item>
}
defineProps<Props>()
</script>

<style
  lang="scss"
  scoped
>

</style>
