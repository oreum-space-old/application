<template>
  <label class="ui-input-wrapper ui-input-text">
    <textarea
      v-model="model"
      class="ui-input ui-input-text__input"
      :class="{ 'ui-input_invalid': invalid }"
      placeholder=" "
      :disabled="disabled"
    />
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

const
  props = defineProps<{
    label?: string
    modelValue?: string
    invalid?: boolean
    disabled?: boolean
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
  disabled = computed<boolean>(() => typeof props.modelValue !== 'string' || !!props.disabled)

</script>

<style
  lang="scss"
  scoped
>

</style>
