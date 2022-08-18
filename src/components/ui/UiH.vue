<template>
  <component
    :is="computedTag"
    ref="element"
    class="ui-h"
    :class="classes"
  >
    <template v-if="id">
      <a
        :href="href"
      >
        #
      </a>
      <ui-anchor :id="id" />
    </template>
    <slot />
  </component>
</template>

<script
  setup
  lang="ts"
>
import UiAnchor from '@/components/ui/UiAnchor.vue'
import { computed, onMounted, ref } from 'vue'

type Level = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

type Props = {
  id?: string
  level?: Level
}
const
  props = defineProps<Props>(),
  computedLevel = computed<`${Level}`>(() => `${props.level || 3}`),
  computedTag = computed<'span' | `h${Level}`>(() => props.id ? `h${computedLevel.value}` : 'span'),
  classes = computed(() => ({
    [`h${computedLevel.value}`]: true
  })),
  element = ref<HTMLElement>(),
  href = computed(() => props.id ? `#${props.id}` : '')

onMounted(() => {
  if (document.location.hash === href.value) {
    document.location.hash = ''
    requestAnimationFrame(() => document.location.hash = href.value)
  }
})
</script>

<style lang="scss">
.ui-h {
  position: relative;
  margin-left: 24px;

  & > a {
    color: var(--primary-color);
    position: absolute;
    float: left;
    margin-left: -1em;
    padding-left: 0.30em;
    opacity: 0;
    transition: opacity linear 0.16s;
    text-decoration: none;

    &:focus-visible {
      opacity: 1;
      outline: none;
    }
  }

  &:hover {
    & > a { opacity: 1 }
  }
}
</style>
