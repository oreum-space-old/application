<template>
  <label class="ui-input-wrapper ui-input-text">
    <textarea
      v-model="model"
      class="ui-input ui-input-textarea"
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
.ui-input-textarea {
  line-height: 20px;

  @media (hover: hover) {
    &::-webkit-scrollbar {
      display: unset;
      width: 8px;
      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      background: #FFFFFF20 content-box;
      border-radius: 4px;
      border: 2px solid transparent;
      cursor: pointer;
    }

    &::-webkit-scrollbar-corner {
      display: none;
      height: 1px;
    }
  }
}
</style>
