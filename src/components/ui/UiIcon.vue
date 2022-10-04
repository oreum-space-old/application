<template>
  <svg
    class="ui-icon"
    :class="classes"
    :width="width"
    :height="height"
    :style="{
      rotate: rotate && `${rotate}deg`
    }"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use
      :href="`${icons}#${icon}`"
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import icons from '@/assets/icons.svg'
import { isRef, ref } from 'vue'

export interface UiIconProps {
  width?: number
  height?: number
  icon: string
  rotate?: string
}

const
  props = withDefaults(defineProps<UiIconProps>(), {
    width: 24,
    height: (props) => props.width || 24,
    rotate: undefined,
    button: undefined
  }),
  active = props.button ? ref<boolean>(false) : undefined,
  classes = {
    'ui-icon_button': props.button,
    'ui-icon_active': isRef(active) && active.value
  }

</script>
