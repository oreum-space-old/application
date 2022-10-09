<template>
  <label class="ui-input-wrapper ui-input-wrapper_code">
    <input
      v-model="_modelValue"
      class="ui-input ui-input-code"
      maxlength="6"
    >
    <span
      v-for="i of 6"
      :key="i"
      class="ui-input-cell"
      :class="{
        'ui-input-cell_number': modelValue[i - 1]
      }"
      :style="{ '--i': i - 1 }"
    >
      {{ modelValue[i - 1] || ' ' }}
    </span>
  </label>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

type Props = {
  modelValue: string
}
const
  props = defineProps<Props>(),
  emits = defineEmits<{
    (e: 'update:model-value', value: string): void
  }>(), _modelValue = computed<string>({
    get () {
      return props.modelValue
    }, set (value: string) {
      emits('update:model-value', value)
    }
  })
</script>

<style lang="scss">
.ui-input-wrapper_code {
  height: 36px;
  min-height: 36px;
}

.ui-input.ui-input-code {
  opacity: 0.75;
  height: 36px;
  min-height: 36px;
  letter-spacing: 28px;
}

.ui-input-cell {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.25;
  top: 0;
  border: #ff0000 solid 2px;
  border-radius: 4px;
  left: calc(var(--i) * 40.67px);
  font-size: 0;
  transition: 67ms ease-in-out font-size;
  pointer-events: none;

  &_number {
    font-size: 20px;
  }
}
</style>