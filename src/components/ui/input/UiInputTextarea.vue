<template>
  <label class="ui-input-wrapper ui-input-text">
    <textarea
      v-model="model"
      class="ui-input ui-input-textarea"
      :class="{ 'ui-input_invalid': invalid }"
      placeholder=" "
      :disabled="disabled"
      @scroll="scroll"
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

function scroll (event: Event) {
  const target = event.target as HTMLTextAreaElement
  console.dir(target)
}

</script>

<style
  lang="scss"
  scoped
>
.ui-input-textarea {
  line-height: 20px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: red;
  }
}
</style>
