<template>
  <div
    class="ui-input-color"
    :style="{ backgroundColor: hex }"
  >
    <div
      v-over.father
      class="ui-input-color__dropdown"
    >
      <div class="ui-input-color__picker">

      </div>
      <div class="flex justify-between">
        <div class="ui-input-color__hex">
          <label>
            <input
              type="text"
              :value="hex"
            >
          </label>
        </div>
        <div class="ui-input-color__modes">
          <button
            type="button"
          >
            RGB
          </button>
          <button
            type="button"
          >
            HSV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue'

type Props = {
  modelValue: number
}

const AVAILABLE_MODES = ['RGB', 'HSV'] as const

type Mode = typeof AVAILABLE_MODES[number]

function getMode (): Mode {
  const item = localStorage.getItem('UiInputColorMode') as Mode | undefined
  if (item && AVAILABLE_MODES.includes(item)) {
    return item
  }
  return 'RGB'
}

function setMode (mode: Mode) {
  localStorage.setItem('UiInputColorMode', mode)
}

const
  props = defineProps<Props>(),
  hex = computed(() => {
    return `#${props.modelValue.toString(16)}`
  }),
  _mode = ref<'RGB' | 'HSV'>(getMode()),
  mode = computed({
    get (): Mode {
      return _mode.value
    },
    set (mode: Mode): void {
      setMode(mode)
      _mode.value = mode
    }
  })

</script>

<style
  lang="scss"
  scoped
>
.ui-input-color {
  position: relative;
  width: 32px;
  height: 32px;

  &__dropdown {

  }
}
</style>