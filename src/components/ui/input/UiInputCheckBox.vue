<template>
  <label
    class="ui-input-checkbox__label"
    @click="$emit('update:modelValue', !modelValue); checkbox?.focus()"
  >
    <span
      ref="checkbox"
      tabindex="0"
      role="checkbox"
      class="ui-input-checkbox"
      :class="{ 'ui-input-checkbox_checked': !!modelValue }"
      :aria-checked="modelValue"
      @keyup.space.prevent.stop.capture="$emit('update:modelValue', !modelValue)"
    />
    <span class="ui-input-checkbox__text">
      {{ label }}
    </span>
  </label>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'

type Props = {
  label?: string
  modelValue: boolean
}
defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checkbox = ref<HTMLElement>()
</script>