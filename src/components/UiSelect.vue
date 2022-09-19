<template>
  <div
    ref="wrapper"
    role="button"
    class="ui-select"
    :class="{
      'ui-select_open': visible,
      'ui-select_value': !!modelValue
    }"
    :style="{ '--item-height': itemHeight ? `${itemHeight}px` : undefined }"
    @focusout="focusout"
  >
    <div
      ref="list"
      class="ui-select__list"
    >
      <div
        v-for="option of options"
        :key="option.value"
        class="ui-select__option"
        :class="{ 'ui-select__option_selected': option.value === (modelValue?.value || '_') }"
        @click="updateModelValue(option); close()"
      >
        <slot
          name="option"
          :option="option"
        >
          {{ option.display }}
        </slot>
      </div>
    </div>
    <div
      ref="input"
      class="ui-select__input ui-input"
      tabindex="0"
      @click.capture="inputClickHandler"
      @keydown.space="visible = true"
      @keydown.esc="close"
      @keydown.enter="keydownEnterHandler"
      @keydown.up.left="keydownUpHandler"
      @keydown.down.right="keydownDownHandler"
      @keydown="keydownPagesHandler"
    >
      <span
        v-if="label"
        class="ui-input-label ui-select__label"
      >
        {{ label }}
      </span>
      <slot
        name="selected"
        :selected="modelValue"
        :close="close"
      >
        <span
          class="ui-select__selected"
          :class="{ 'ui-select__selected_has': !!modelValue }"
        >
          {{ modelValue?.display }}
        </span>
      </slot>
      <ui-icon
        class="ui-select__arrow"
        icon="dropdown-arrow"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiIcon from '@/components/ui/UiIcon.vue'
import appPreventOverflow from '@/consts/appPreventOverflow'
import updateVisibility from '@/library/updateVisibility'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createPopper, flip, Instance } from '@popperjs/core'

export type UiSelectValue = {
  display: string
  value: string
}

type Props = {
  options: Array<UiSelectValue>
  modelValue: UiSelectValue | null
  label?: string
  itemHeight?: number
}

const
  props = defineProps<Props>(),
  emits = defineEmits<{
    (e: 'update:modelValue', value: UiSelectValue): void
  }>(),
  visible = ref<boolean>(false),
  prevent = ref<boolean>(false),
  input = ref<HTMLElement>(),
  list = ref<HTMLElement>(),
  wrapper = ref<HTMLElement>()

let popper: Instance | null = null

function inputClickHandler () {
  if (!prevent.value) {
    visible.value = !visible.value
  } else {
    prevent.value = false
  }
}

function pointerdownHandler (event: PointerEvent) {
  if (visible.value === true && wrapper.value && !event.composedPath().includes(wrapper.value)) {
    visible.value = false
  }
}

function close () {
  visible.value = false
}

addEventListener('pointerdown', pointerdownHandler)
function _updateVisibility () {
  updateVisibility(popper, visible)
}

watch(visible, _updateVisibility)

function updateModelValue (value: UiSelectValue | number) {
  const modelValue = typeof value !== 'number'
    ? value
    : props.options.at(
      value >= 0
        ? Math.min(props.options.length - 1, value)
        : Math.max(-props.options.length, value))

  if (modelValue) {
    emits('update:modelValue', modelValue)
    if (list.value) {
      const index = props.options.findIndex((_) => modelValue.value === _.value)

      list.value.scrollTo({ top: (index - 1) * (props.itemHeight || 36) })
    }
  }
}

onMounted(() => {
  if (input.value && list.value) {
    popper = createPopper(input.value, list.value, {
      modifiers: [flip, appPreventOverflow],
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

function getCurrentIndex (): number {
  return props.options.indexOf(props.options.find(_ => props.modelValue?.value === _.value) || props.options[0])
}

function keydownEnterHandler () {
  visible.value = !visible.value
}

function keydownUpHandler () {
  updateModelValue(Math.max(getCurrentIndex() - 1, 0))
}

function keydownDownHandler () {
  updateModelValue(Math.min(getCurrentIndex() + 1, props.options.length - 1))
}

function keydownPagesHandler (event: KeyboardEvent) {
  if (event.key === 'Home') {
    updateModelValue(0)
    return
  }
  if (event.key === 'End') {
    updateModelValue(-1)
    return
  }
  if (event.key === 'PageUp') {
    updateModelValue(Math.max(getCurrentIndex() - 10, 0))
    return
  }
  if (event.key === 'PageDown') {
    updateModelValue(getCurrentIndex() + 10)
    return
  }
}

function focusout (event: FocusEvent) {
  const path = event.composedPath()

  setTimeout(() => {
    if (document.activeElement && !path.includes(document.activeElement)) {
      close()
    }
  })
}
</script>

<style lang="scss">
.ui-select {
  position: relative;
  display: flex;
  max-width: fit-content;
  max-height: fit-content;
  --item-height: 36px;

  &__input {
    display: inline-block;
    padding-right: 32px;
    cursor: pointer;
    min-height: 40px;
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
    overflow-y: auto;
    max-height: calc(min(var(--vhf) / 2, var(--item-height) * 10));

    &[data-popper-placement=top] {
      border-radius: 4px 4px 0 0;
    }

    &[data-popper-placement=bottom] {
      border-radius: 0 0 4px 4px;
    }
  }

  &__option {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background-color: var(--surface-c);
    }

    &_selected {
      background-color: var(--primary-color);
      color: var(--primary-color-text);

      &:hover {
        background-color: var(--primary-color-hover);
      }
    }
  }

  &__arrow {
    position: absolute;
    right: 8px;
    top: 8px;
    transform: rotate(180deg);
  }

  &_open {
    .ui-select__arrow {
      transform: rotate(0deg);
    }

    .ui-select__list {
      &[data-popper-placement=top] + .ui-select__input {
        border-radius: 0 0 4px 4px;
      }

      &[data-popper-placement=bottom] + .ui-select__input {
        border-radius: 4px 4px 0 0;
      }
    }
  }

  &_value &__label {
    font-size: 12px;
    top: -0.6rem;
    background-color: inherit;
    padding: 2px 4px;
    margin-left: -4px;
    margin-top: 0;
  }

  &_open &__label {
    color: var(--primary-color);
  }

  &__selected {
    position: absolute;
    opacity: 0;
    transition: 0.25s;

    &_has {
      opacity: 1;
    }
  }
}
</style>