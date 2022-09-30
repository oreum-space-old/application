<template>
  <label class="ui-input-wrapper ui-input-text">
    <input
      ref="input"
      v-model="model"
      :type="type || 'text'"
      class="ui-input ui-input-text__input"
      :class="{ 'ui-input_invalid': invalid }"
      placeholder=" "
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :disabled="computedDisabled"
      @focus="focusHandler"
      @blur="blurHandler"
      @mouseenter="focusHandler"
      @mouseleave="blurHandler"
    >
    <label
      v-if="label"
      class="ui-input-label"
    >
      {{ label }}
    </label>
    <slot />
    <slot
      name="ui-error-hint"
      :focused="focused"
      :input="input"
    />
  </label>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue'

const
  props = defineProps<{
    label?: string
    modelValue?: string
    invalid?: boolean
    disabled?: boolean
    maxlength?: string
    autocomplete?: string,
    type?: 'password' | 'email' | 'text'
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
    typeof props.modelValue !== 'string' || !!props.disabled),
  input = ref<HTMLInputElement>(),
  focused = ref<boolean>(false)

function focus () {
  if (input.value) {
    input.value.focus()
  }
}

function focusHandler () {
  focused.value = true
}
function blurHandler () {
  if (input.value as Element !== document.activeElement) {
    focused.value = false
  }
}

defineExpose({
  focus,
  focused,
  input
})
</script>
