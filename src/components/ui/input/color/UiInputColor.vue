<template>
  <div
    ref="wrapper"
    class="ui-input-color"
  >
    <div
      ref="button"
      class="ui-input-color__button ui-button"
      :style="{
        backgroundColor: valueHEX.value,
        color: contrast
      }"
      @click="visible = !visible"
    >
      {{ valueHEX.value }}
    </div>
    <div
      ref="popover"
      class="ui-input-color__popover"
    >
      <div
        class="ui-input-color__box"
        :class="{ 'ui-input-color__box_hsl': colorModel === 'HSL' }"
        :style="{ color: `hsl(${valueHSL.h}deg 100% 50%)` }"
        @click="colorModel = colorModel === 'HSL' ? 'HEX' : 'HSL'"
      >
        <div
          ref="cursor"
          class="ui-input-color__pointer"
        />
      </div>
      <div class="ui-input-color">

      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import updateVisibility from '@/library/updateVisibility'
import { createPopper, flip, Instance } from '@popperjs/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  COLOR_MODELS,
  ColorModel,
  ColorValue,
  ColorValueCMY,
  ColorValueHEX,
  ColorValueHSL,
  ColorValueHSV,
  ColorValueRGB, rgbToHsl, rgbToHsv
} from '.'

type Props = {
  modelValue: string | number
  alpha?: true,
  colorModel?: ColorModel
}

type ModelValue = Props['modelValue']

type Emits = {
  (e: 'update:modelValue', v: Props['modelValue']): void
}

const
  props = defineProps<Props>(),
  emits = defineEmits<Emits>()

const
  colorModel = ref<ColorModel>(props.colorModel || COLOR_MODELS[0]),
  alpha = computed(() => {
    return props.alpha
      ? (typeof props.modelValue === 'string' ? parseInt(props.modelValue.slice(1), 16) : props.modelValue) & 0xff
      : undefined
  }),
  value = computed<number>({
    get () {
      if (typeof props.modelValue === 'string') {
        return parseInt(props.modelValue.slice(1), 16) >> (props.alpha ? 8 : 0)
      }
      return props.modelValue
    },
    set (v: ModelValue | ColorValue) {
      if (typeof v !== 'object') {
        emits('update:modelValue', v)
      }
      // TODO: сделать конвертер в ColorValue => ModelValue
    }
  }),
  _valueHEX = ref<ColorValueHEX>({
    model: COLOR_MODELS[0],
    r: value.value >> 16 & 0xff,
    g: value.value >> 8 & 0xff,
    b: value.value & 0xff,
    value: `#${ (
      value.value.toString(16).padStart(6, '0') + (
        alpha.value === undefined ? '' : alpha.value.toString(16).padStart(2, '0')
      )
    ).toUpperCase() }`
  }),
  _valueRGB = ref<ColorValueRGB>({
    model: COLOR_MODELS[1],
    r: _valueHEX.value.r,
    g: _valueHEX.value.g,
    b: _valueHEX.value.b,
    value: alpha.value === undefined
      ? `rgb(${
        value.value << 16 & 0xff
      }, ${
        value.value << 16 & 0xff
      }, ${
        value.value << 16 & 0xff
      })`
      : `rgba(${
        value.value << 16 & 0xff
      }, ${
        value.value << 16 & 0xff
      }, ${
        value.value << 16 & 0xff
      }, ${
        alpha.value.toFixed(3)
      })`
  }),
  _valueCMY = ref<ColorValueCMY>({
    model: COLOR_MODELS[2],
    c: 1 - _valueHEX.value.r / 0xff,
    m: 1 - _valueHEX.value.g / 0xff,
    y: 1 - _valueHEX.value.b / 0xff,
    value: alpha.value === undefined
      ? `cmy(${
        (1 - _valueHEX.value.r / 0xff).toFixed(3)
      }, ${
        (1 - _valueHEX.value.g / 0xff).toFixed(3)
      }, ${
        (1 - _valueHEX.value.b / 0xff).toFixed(3)
      })`
      : `cmy(${
        (1 - _valueHEX.value.r / 0xff).toFixed(3)
      }, ${
        (1 - _valueHEX.value.g / 0xff).toFixed(3)
      }, ${
        (1 - _valueHEX.value.b / 0xff).toFixed(3)
      }, ${
        alpha.value.toFixed(3)
      })`
  }),
  _valueHSL = ref<ColorValueHSL>(rgbToHsl(_valueRGB.value, alpha.value)),
  _valueHSV = ref<ColorValueHSV>(rgbToHsv(_valueRGB.value, alpha.value)),
  valueHEX = computed<ColorValueHEX>({
    get () {
      return _valueHEX.value
    },
    set (colorValue: ColorValue): void {
      console.info('todo')
    }
  }),
  valueRGB = computed<ColorValueRGB>({
    get () {
      return _valueRGB.value
    },
    set (colorValue: ColorValue): void {
      console.info('todo')
    }
  }),
  valueCMY = computed<ColorValueCMY>({
    get () {
      return _valueCMY.value
    },
    set (colorValue: ColorValue): void {
      console.info('todo')
    }
  }),
  valueHSL = computed<ColorValueHSL>({
    get () {
      return _valueHSL.value
    },
    set (colorValue: ColorValue): void {
      console.info('todo')
    }
  }),
  valueHSV = computed<ColorValueHSV>({
    get () {
      return _valueHSV.value
    },
    set (colorValue: ColorValue): void {
      console.info('todo')
    }
  }),
  contrast = computed(
    () =>
      Object
        .values(valueRGB)
        .filter(_ => typeof _ === 'number')
        .reduce(($, _) => $ + _, 0) > 0x18
        ? 'white'
        : 'black'
  )

// Popover
const
  wrapper = ref<HTMLElement>(),
  button = ref<HTMLElement>(),
  popover = ref<HTMLElement>(),
  visible = ref<boolean>(false)

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

onMounted(() => {
  if (button.value && popover.value) {
    popper = createPopper(button.value, popover.value, {
      modifiers: [
        flip,
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            padding: 8
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          }
        }
      ],
      onFirstUpdate () {
        _updateVisibility()
      },
      placement: 'right'
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
.ui-input-color {
  max-width: fit-content;
  max-height: fit-content;

  &__button {
    display: flex;
    text-align: center;
    width: 96px;
    border: 1px solid;
    outline: 2px solid currentcolor;
    outline-offset: -2px;

    &:not(:hover):not(:focus) {
      outline-color: transparent;
    }
  }

  &__popover {
    display: flex;
    padding: 24px;
    background-color: var(--surface-overlay);
    box-shadow: var(--surface-overlay-shadow);
    border-radius: 12px;
    gap: 16px;
    z-index: 1;
    user-select: none;
    -webkit-user-drag: none;

    @media (orientation: portrait) {
      flex-flow: column;
    }

    .ui-input {
      width: 256px;
    }
  }

  &__box {
    position: relative;
    width: 256px;
    height: 256px;
    background: linear-gradient(0, #000000FF, #00000000), linear-gradient(90deg, #FFFFFFFF, #FFFFFF00) currentcolor;

    &_hsl {
      background: linear-gradient(0deg, #000000FF, #00000000 50%, #FFFFFF00 50%, #FFFFFFFF), linear-gradient(90deg, #808080FF, currentcolor);
    }
  }

  &__pointer {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 5px;
    border: 1px solid var(--color);
    transform: translate(-5px, 5px);
    transition: border-color ease-in-out 0.25s;

    &::after {
      content: ' ';
      display: block;
      left: 4px;
      top: 4px;
      position: relative;
      width: 1px;
      height: 1px;
      background-color: var(--color);
      border-radius: 1px;
      transition: background-color ease-in-out 0.25s;
    }
  }

  &__form {
    display: flex;
    flex-flow: column;
    gap: 8px;
  }
}

</style>