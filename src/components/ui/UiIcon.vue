<template>
  <svg
    class="ui-icon"
    :class="classes"
    :tabindex="button && '0'"
    :role="button && 'button'"
    :width="width"
    :height="height"
    :style="{
      rotate: rotate && `${rotate}deg`
    }"
    xmlns="http://www.w3.org/2000/svg"
    @click="keydown"
    @keydown.enter.space="keydown"
    @keyup.enter.space="keyup"
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
  button?: true
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
  },
  emits = defineEmits<{ (e: 'click'): void }>()

function keydown () {
  if (isRef(active)) {
    active.value = true
    emits('click')
  }
}

function keyup () {
  if (isRef(active)) {
    active.value = false
  }
}

</script>
