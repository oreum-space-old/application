<template>
  <div
    class="ui-input-radio-group gap4"
    :class="column ? 'flex' : 'flex-row'"
    role="radiogroup"
  >
    <label
      v-for="option in options"
      :key="getOptionKey(option)"
      class="ui-input-radio__label"
      @click="$emit('update:modelValue', option)"
    >
      <span
        class="ui-input-radio"
        :class="{ 'ui-input-radio_selected': getOptionKey(modelValue) === getOptionKey(option) }"
        role="radio"
      >
        <span class="ui-input-radio__icon" />
      </span>
      <span class="ui-input-radio__text">
        {{ getOptionText(option) }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

function define<Item extends string | Record<string, string | number>>() {
  return defineComponent({
    props: {
      modelValue: {
        type: null as unknown as PropType<Item>,
        required: true
      },
      options: {
        type: Array as PropType<Readonly<Array<Item>>>,
        required: true
      },
      optionsKey: {
        type: String as unknown as PropType<Item extends string ? undefined : keyof Item>,
        default: undefined
      },
      optionsTextKey: {
        type: String as unknown as PropType<Item extends string ? undefined : keyof Item>,
        default: undefined
      },
      column: {
        type: Boolean as PropType<boolean>,
        default: false
      }
    },
    emits: {
      ['update:modelValue']: (payload: Item) => payload
    },
    setup (props) {
      return {
        getOptionKey (option: Item): string | number {
          if (typeof option === 'string') {
            return option
          } else if (props.optionsKey !== undefined) {
            return (option as Record<string, string | number>)[props.optionsKey]
          } else {
            return props.options.indexOf(option)
          }
        },
        getOptionText (option: Item): string | number {
          if (typeof option === 'string') {
            return option
          } else if (props.optionsTextKey !== undefined) {
            return (option as Record<string, string | number>)[props.optionsTextKey]
          } else {
            return props.options.indexOf(option)
          }
        }
      }
    }
  })
}

const main = define()

export function _GenericUiInputRadioGroup<Item extends string | Record<string, string | number>>() {
  return main as unknown as ReturnType<typeof define<Item>>
}

export type GenericUiInputRadioGroup<Item extends string | Record<string, string | number>> =
  ReturnType<typeof _GenericUiInputRadioGroup<Item>>

export default main
</script>
