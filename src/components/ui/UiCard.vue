<template>
  <component
    :is="computedTag"
    class="card"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

type Props = {
  tag?: 'div' | 'section' | 'nav' | 'aside'
  row?: boolean
}
const
  props = defineProps<Props>(),
  computedTag = computed(() => props.tag || 'div'),
  classes = computed(() => ({
    ['card-row']: props.row
  }))
</script>
