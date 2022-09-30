<template>
  <div
    ref="popover"
    class="ui-error-hint"
    :class="{ 'ui-error-hint_error': errors?.length }"
  >
    <small
      v-if="description"
      class="ui-error-hint__description"
    >
      {{ description }}
    </small>
    <template v-if="typeof errors !== 'string'">
      <small
        v-for="error of errors"
        :key="error"
        class="ui-error-hint__error"
      >
        • {{ error }}
      </small>
    </template>
    <span
      v-else-if="errors"
      class="ui-error-hint__error"
    >
      • {{ errors }}
    </span>
    <div
      class="ui-error-hint__arrow"
      data-popper-arrow
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import updateVisibility from '@/library/updateVisibility'
import { createPopper, Instance } from '@popperjs/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Props = {
  description?: string
  errors?: string | Array<string>
  focused: boolean
  input?: HTMLInputElement
}
const
  props = defineProps<Props>(),
  input = computed(() => props.input),
  visible = computed(() => props.focused),
  popover = ref<HTMLElement>()

let popper: Instance | null = null


function _updateVisibility () {
  updateVisibility(popper, visible)
}

watch(visible, _updateVisibility)

onMounted(() => {
  if (input.value && popover.value) {
    popper = createPopper(input.value, popover.value, {
      placement: 'right-start',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top-end', 'bottom-end'],
          },
        },
        {
          name: 'arrow',
          options: {
            padding: 4,
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          }
        }
      ],
      onFirstUpdate () {
        _updateVisibility()
      }
    })
  }
})

onBeforeUnmount(() => {
  if (popper) {
    popper.destroy()
  }
})
</script>

<style
  lang="scss"
  scoped
>
.ui-error-hint {
  display: flex;
  flex-flow: column;
  padding: 4px 8px;
  --background-color: var(--primary-color);
  background-color: var(--background-color);
  box-shadow: var(--surface-overlay-shadow);
  border-radius: 4px;
  color: var(--primary-color-text);
  gap: 4px;
  z-index: 1;
  user-select: none;
  -webkit-user-drag: none;
  width: fit-content;
  max-width: 100%;
  opacity: 1;
  translate: 0 0;
  transition: opacity 0.25s linear, translate 0.25s ease-in-out;

  &_error {
    --background-color: var(--danger-color);
  }

  &__arrow {
    width: 8px;
    height: 8px;
    clip-path: polygon(4px 0, 8px 4px, 4px 8px, 0 4px);
    background-color: var(--background-color);
    box-shadow: var(--surface-overlay-shadow);
  }

  &[data-popper-hidden=true] {
    opacity: 0;

    &[data-popper-placement=right-start] {
      translate: 4px 0;
    }

    &[data-popper-placement=top-end] {
      translate: 0 -4px;
    }

    &[data-popper-placement=bottom-end] {
      translate: 0 4px;
    }
  }

  &[data-popper-placement=right-start] &__arrow {
    left: -4px;
  }

  &[data-popper-placement=top-end] &__arrow {
    bottom: -4px;
  }

  &[data-popper-placement=bottom-end] &__arrow {
    top: -4px;
  }

}
</style>