<template>
  <div
    class="ui-color-slider ui-input"
    :style="{
      width: width ? `${width}px` : '256px',
      backgroundImage,
      '--modelValue': `${modelValue}px`,
      '--max': max || 255
    }"
  >
    <input
      class="ui-color-slider__text"
      :value="modelValue"
      type="text"
      min="0"
      :max="max || 255"
    >
    <input
      v-model="value"
      class="ui-color-slider__slider"
      type="range"
      min="0"
      :max="max || 255"
    >
    <span
      v-if="label"
      class="ui-color-slider__label"
    >
      {{ label }}
    </span>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue'

type Props = {
  modelValue: number,
  width?: number,
  max?: number,
  background?: [string, string] | string,
  label?: string
}
const
  props = defineProps<Props>(),
  emits = defineEmits<{
    (e: 'update:modelValue', v: number): void
  }>(),
  backgroundImage = computed<string>(() => {
    return props.background
      ? (
        typeof props.background === 'string'
          ? props.background
          : `linear-gradient(to right, ${props.background[0]}, ${props.background[1]})`
      )
      : ''
  }),
  value = computed<number>({
    get () {
      return props.modelValue
    },
    set (value: number | string) {
      emits('update:modelValue', typeof value === 'string' ? parseInt(value) : value)
    }
  })

</script>

<style
  lang="scss"
  scoped
>
.ui-color-slider {
  text-align: end;
  position: relative;
  border: 0 solid transparent;
  clip-path: inset(0 0 0 0);
  box-shadow: 0 0 0 1px var(--surface-border-a-static) inset;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
  user-select: none;

  &::before,
  &::after {
    position: absolute;
    content: ' ';
    width: 9px;
    height: 9px;
    background-color: var(--surface-overlay);
    border: 1px solid var(--surface-border-a-static);
    transform-origin: center center;
    transform: rotate(45deg);
    left: calc((var(--modelValue) - 6px) * 1.0075 * (255 / var(--max)));
  }

  &::before {
    top: -6px;
    z-index: 1;
  }
  &::after {
    bottom: -6px;
    z-index: 1;
    transform: rotate(-135deg);
  }

  &__slider {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;

    &::-webkit-slider-runnable-track {
      height: 100%;
    }

    &::-webkit-slider-thumb {
      height: 100%;
    }
  }

  &__text {
    z-index: 2;
    width: fit-content;
    display: flex;
    appearance: none;
    border: none;
    background: transparent;
    text-align: end;
    max-width: 4ex;
    font-size: inherit;
    font-family: inherit;
    outline: none;
  }

  &__label,
  &__text {
    font-weight: 500;
    color: black;
  }
}
</style>