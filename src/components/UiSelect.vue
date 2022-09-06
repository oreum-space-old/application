<template>
  <div
    ref="wrapper"
    class="ui-select"
    :class="{ 'ui-select__open': visible }"
  >
    <div
      ref="list"
      class="ui-select__list"
    >
      <div
        v-for="option of options"
        :key="option"
        class="ui-select__option"
        @click="updateModelValue(option); visible = false"
      >
        {{ option.display }}
      </div>
    </div>
    <span
      ref="input"
      class="ui-select__input ui-input caret-hidden"
      @click.capture="visible = !visible"
    >
      {{ modelValue.display }}
    </span>
  </div>
</template>

<script
  setup
  lang="ts"
>
import updateVisibility from '@/library/updateVisibility'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createPopper, flip, preventOverflow, Instance } from '@popperjs/core'

type UiSelectValue = {
  display: string
  value: string
}

type Props = {
  options: Array<UiSelectValue>
  modelValue: UiSelectValue
}

const
  props = defineProps<Props>(),
  emits = defineEmits<{
    (e: 'update:modelValue', value: UiSelectValue): void
  }>(),
  visible = ref<boolean>(false),
  input = ref<HTMLElement>(),
  list = ref<HTMLElement>(),
  wrapper = ref<HTMLElement>()

let popper: Instance | null = null

function pointerdownHandler (event: PointerEvent) {
  if (visible.value === true && wrapper.value && !event.composedPath().includes(wrapper.value)) {
    visible.value = false
  }
}

addEventListener('pointerdown', pointerdownHandler)
function _updateVisibility () {
  updateVisibility(popper, visible)
}

watch(visible, _updateVisibility)

function updateModelValue (modelValue: UiSelectValue) {
  emits('update:modelValue', modelValue)
}

onMounted(() => {
  if (input.value && list.value) {
    popper = createPopper(input.value, list.value, {
      modifiers: [flip, preventOverflow],
      onFirstUpdate: _updateVisibility
    })
  }
})

onBeforeUnmount(() => {
  if (popper) {
    popper.destroy()
  }
  removeEventListener('pointerdown', pointerdownHandler)
})
</script>

<style lang="scss">
.ui-select {
  position: relative;
  display: flex;
  max-width: fit-content;
  max-height: fit-content;

  &__input {
    display: inline-block;
  }

  &:hover &__input {
    border-color: var(--text-color-secondary);
  }

  &:focus-within &__input {
    box-shadow: inset 0 0 0 1px var(--primary-color), inset 0 0 0 1px var(--primary-color), inset 0 0 0 1px var(--primary-color), inset 0 0 0 1px var(--primary-color);
    border-color: var(--primary-color);
    outline: 0;
    outline-offset: 0;
  }

  &__list {
    width: 100%;
    background-color: var(--surface-overlay);
    box-shadow: var(--surface-overlay-shadow);
    z-index: 1;
  }

  &__option {
    padding: 8px 12px;

    &:hover {
      background-color: var(--surface-c);
    }
  }
}
</style>