<template>
  <label class="ui-input-wrapper ui-input-text">
    <input
      v-model="model"
      class="ui-input ui-input-text__input"
      :class="{ 'ui-input_invalid': invalid }"
      placeholder=" "
      type="text"
      :disabled="computedDisabled"
    >
    <label
      v-if="label"
      class="ui-input-label"
    >
      {{ label }}
    </label>
  </label>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

export type UiInputTextAsync = 'initial' | 'sending' | 'valid' | 'invalid'

const
  props = defineProps<{
    label?: string
    modelValue?: string
    invalid?: boolean
    disabled?: boolean
    async?: UiInputTextAsync
  }>(),
  emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>(),
  model = computed({
    get (): string {
      return props.modelValue || ''
    },
    set (value: string) {
      emits('update:modelValue', value)
    }
  }),
  computedDisabled = computed<boolean>(() =>
    typeof props.modelValue !== 'string' || !!props.disabled)

</script>
