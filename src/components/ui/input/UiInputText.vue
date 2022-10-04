<template>
  <label class="ui-input-wrapper ui-input-text">
    <input
      ref="input"
      v-model="model"
      :type="showPassword || type || 'text'"
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
    <ui-icon-button
      v-if="type === 'password'"
      :tabindex="undefined"
      class="ui-input-text__show-password ui-input-icon"
      :icon="showPassword ? 'eye-hide' : 'eye-show'"
      @click="showPassword = showPassword ? '' : 'text'"
    />
  </label>
</template>

<script
  setup
  lang="ts"
>
import UiIconButton from '@/components/ui/UiIconButton.vue'
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
  focused = ref<boolean>(false),
  showPassword = props.type ? ref<'text' | ''>('') : undefined

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
