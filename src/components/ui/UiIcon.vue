<template>
  <svg
    class="ui-icon"
    :width="width"
    :height="height"
    :style="style"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="`${icons}#${icon}`" />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import icons from '@/assets/icons.svg'
import { computed } from 'vue'

type Props = {
  icon: string
  width?: number
  height?: number
  rotate?: string
}

const
  props = withDefaults(defineProps<Props>(), {
    width: 24,
    height: 24,
    rotate: undefined
  }),
  style = computed(() => props.rotate ? { transform: `rotate(${props.rotate}deg)` } : undefined)
</script>
