<template>
  <ul
    ref="root"
    tabindex="0"
    role="menubar"
    class="ui-menu-bar"
    :class="{
      'ui-menu-bar_submenu': submenu,
      'ui-menu-bar_column': column
    }"
    @focusout="focusout"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      role="menuitem"
      class="ui-menu-bar__item"
      @pointerenter="isFinite(opened) && (opened = item.items ? index : -1)"
      @click="!item.items && collapse()"
    >
      <router-link
        v-if="item.to"
        :to="item.to"
        class="ui-menu-bar__button"
        :class="{ 'ui-menu-bar__button_opened': opened === index }"
      >
        <ui-icon
          v-if="item.icon"
          :icon="item.icon"
        />
        {{ l(item.text) }}
      </router-link>
      <a
        v-else-if="item.action"
        class="ui-menu-bar__button"
        :class="{ 'ui-menu-bar__button_opened': opened === index }"
        @click="item.action"
      >
        <ui-icon
          v-if="item.icon"
          :icon="item.icon"
        />
        {{ l(item.text) }}
      </a>
      <a
        v-else-if="item.link"
        class="ui-menu-bar__button"
        :class="{ 'ui-menu-bar__button_opened': opened === index }"
        :href="item.link"
      >
        <ui-icon
          v-if="item.icon"
          :icon="item.icon"
        />
        {{ l(item.text) }}
      </a>
      <template v-else-if="item.items">
        <a
          tabindex="0"
          class="ui-menu-bar__button"
          :class="{ 'ui-menu-bar__button_opened': opened === index }"
          @pointerover="pointerover && pointerover(index)"
          @focusin="focusin && focusin(index)"
        >
          <ui-icon
            v-if="item.icon"
            :icon="item.icon"
          />
          {{ l(item.text) }}
          <ui-icon
            v-if="!item.arrowHidden"
            icon="dropdown-arrow"
            :rotate="submenu ? (opened === index ? '270' : '90') : (opened === index ? '0' : '180')"
          />
        </a>
        <ui-menu-bar
          v-show="index === opened"
          :ref="`submenu_${index}`"
          :items="item.items"
          submenu
          @collapse="$emit('collapse', opened = NaN)"
        />
      </template>
    </li>
  </ul>
</template>

<script
  setup
  lang="ts"
>
import UiIcon from '@/components/ui/UiIcon.vue'
import useLang from '@/stores/lang'
import { ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface ItemRaw {
  icon?: string
  text: string
  link?: never
  to?: never
  action?: never
  items?: never
  arrowHidden?: never
}

interface ItemLink extends Omit<ItemRaw, 'link'> {
  link: string
}

interface ItemRouterLink extends Omit<ItemRaw, 'to'> {
  to: RouteLocationRaw
}

interface ItemAction extends Omit<ItemRaw, 'action'> {
  action: (this: ItemAction) => void
}

interface ItemSubmenu extends Omit<ItemRaw, 'items' | 'arrowHidden'> {
  items: Items
  arrowHidden?: boolean
}

type Item = ItemLink | ItemSubmenu | ItemAction | ItemRouterLink

type Items = Readonly<Array<Item>>

const props = defineProps<{
  items: Items
  submenu?: boolean
  column?: boolean
}>(),
  emits = defineEmits<{
    (e: 'collapse'): void
  }>(),
  root = ref<HTMLUListElement>(),
  opened = ref<number>(NaN),
  { l } = useLang()

function collapse () {
  emits('collapse')
}

function focusout (event: FocusEvent): void {
  if (!event.relatedTarget) {
    opened.value = NaN
  }
}

function focusinPointeroverHandler (index: number): void {
  opened.value = index
}

const pointerover = ref(props.submenu ? focusinPointeroverHandler : undefined)
const focusin = ref(props.submenu ? undefined : focusinPointeroverHandler)
</script>

<style lang="scss">
.ui-menu-bar {
  display: flex;
  list-style: none;
  white-space: nowrap;

  &_column {
    flex-flow: column;

    .ui-menu-bar__item {
      position: relative;

      &:first-child .ui-menu-bar__button {
        border-radius: 4px 4px 0 0;
      }

      &:last-child .ui-menu-bar__button {
        border-radius: 0 0 4px 4px;
      }
    }
  }

  &_submenu {
    border-radius: 4px;
    position: absolute;
    display: block;
    background-color: var(--surface-overlay);
    min-width: 100%;

    & & {
      left: 100%;
      top: 0;
    }
  }

  &__item {
    position: relative;

    a {
      color: var(--text-color);
    }

    &:first-child .ui-menu-bar__button {
      border-radius: 4px 0 0 4px;
    }

    &:last-child .ui-menu-bar__button {
      border-radius: 0 4px 4px 0;
    }
  }

  &__button {
    display: flex;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    padding: 8px 12px;
    color: var(--text-color);
    text-decoration: none;
    line-height: 24px;
    background-color: transparent;

    &:focus {
      background-color: #FFFFFF16;
    }

    &:active {
      background-color: #FFFFFF12;
    }

    &_opened {
      background-color: #FFFFFF04;
    }

    &:hover {
      background-color: #FFFFFF0A;
    }
  }
}
</style>