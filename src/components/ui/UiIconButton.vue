<template>
  <ui-icon
    class="ui-icon_button"
    :class="classes"
    role="button"
    tabindex="0"
    :width="width"
    :height="height"
    :icon="icon"
    :rotate="rotate"
    @click="keydown"
    @keydown.enter.space="keydown"
    @keyup.enter.space="keyup"
  />
</template>

<script
  setup
  lang="ts"
>
import UiIcon from '@/components/ui/UiIcon.vue'
import { ref } from 'vue'

export type UiIconButton = {
  width?: number
  height?: number
  icon: string
  rotate?: string
  disabled?: boolean
} // UiIconProps

defineProps<UiIconButton>()
const
  active = ref<boolean>(false),
  classes = {
    'ui-icon_active': active.value
  },
  emits = defineEmits<{ (e: 'click'): void }>()

function keydown () {
  active.value = true
  emits('click')
}

function keyup () {
  active.value = false
}
</script>

<style
  lang="scss"
  scoped
>

</style>