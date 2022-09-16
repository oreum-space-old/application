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
        ref="box"
        class="ui-input-color__box"
        :class="{ 'ui-input-color__box_hsl': colorModel === 'HSL' }"
        :style="{
          color: `hsl(${valueHSL.h}deg 100% 50%)`,
          '--contrast': contrast
        }"
        @scroll.prevent.capture
        @pointerdown="boxPointerDown"
      >
        <div
          class="ui-input-color__pointer"
          :style="{
            backgroundColor: valueHEX.value,
            left: `${(colorModel === 'HSL' ? valueHSL.s : valueHSV.s) * 2.55}px`,
            top: `calc(255px - ${(colorModel === 'HSL' ? valueHSL.l : valueHSV.v) * 2.55}px)`
          }"
        />
      </div>
      <div class="ui-input-color__form">
        <ui-select
          :model-value="{ display: colorModel, value: colorModel }"
          :options="COLOR_MODELS.map(_ => ({ display: _, value: _ }))"
          @update:model-value="colorModel = $event.value"
        >
          <template #option="{ option }">
            <div class="ui-input-color__color-model ui-input-color__color-model_option">
              <b>{{ option.display }}</b>
              <small>{{ this[`value${ option.value }`].value }}</small>
            </div>
          </template>
          <template #selected="{ selected, close }">
            <div class="ui-input-color__color-model">
              <b>{{ selected.display }}</b>
              <small
                class="small-small"
                @click="copyColorModelValue($event); close()"
              >
                {{ this[`value${selected.value}`].value }}
              </small>
            </div>
          </template>
        </ui-select>
        <component
          :is="colorModelForm"
          :value="this[`value${colorModel}`]"
          :model="colorModel"
          @set-value="setValue"
        />
        <!--
        <div
          style="
            position: absolute;
            display: flex;
            flex-flow: row wrap;
            bottom: calc(100%);
            gap: 8px;
            left: 0;
            padding: 8px;
            width: 66vw;
            max-width: 66vw
          "
        >
          <code
            v-for="_model of COLOR_MODELS"
            :key="_model"
            style="min-width: 256px; box-shadow: var(&#45;&#45;surface-overlay-shadow)"
          >
            <small style="color: greenyellow">debug </small>
            <small
              v-for="(_value, key) in this[`value${_model}`]"
              :key="key"
            >
              {{ key[0] }}: {{ _value }}<br>
            </small>
          </code>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiSelect from '@/components/UiSelect.vue'
import updateVisibility from '@/library/updateVisibility'
import { createPopper, flip, Instance } from '@popperjs/core'
import type { Component } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  COLOR_MODELS,
  ColorModel, ColorValue, ColorValueCMY, ColorValueHEX, ColorValueHSL, ColorValueHSV, ColorValueRGB, ColorValueRGBLike,
  getColorModelComponent, hslToRgb, hsvToRgb, rgbToHsl, rgbToHsv,
  valueCMYValue, valueHEXValue, valueHSLValue, valueHSVValue, valueRGBValue
} from '.'

type ModelValue = string | number

type Props = {
  modelValue: ModelValue
  alpha?: true,
  colorModel?: ColorModel
}

type Emits = {
  (e: 'update:modelValue', v: ModelValue): void
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
  value = computed<number>((): number => {
      if (typeof props.modelValue === 'string') {
        return parseInt(props.modelValue.slice(1), 16) >> (props.alpha ? 8 : 0)
      }
      return props.modelValue
    }
  ),
  valueHEX = ref<ColorValueHEX>({
    model: COLOR_MODELS[0],
    r: value.value >> 16 & 0xff,
    g: value.value >> 8 & 0xff,
    b: value.value & 0xff,
    value: valueHEXValue(
      { r: value.value >> 16 & 0xff, g: value.value >> 8 & 0xff, b: value.value & 0xff },
      alpha.value
    )
  }),
  valueRGB = ref<ColorValueRGB>({
    model: COLOR_MODELS[1],
    r: valueHEX.value.r,
    g: valueHEX.value.g,
    b: valueHEX.value.b,
    value: valueRGBValue(valueHEX.value, alpha.value)
  }),
  valueCMY = ref<ColorValueCMY>({
    model: COLOR_MODELS[2],
    c: 1 - valueHEX.value.r / 0xff,
    m: 1 - valueHEX.value.g / 0xff,
    y: 1 - valueHEX.value.b / 0xff,
    value: valueCMYValue({
      c: 1 - valueHEX.value.r / 0xff,
      m: 1 - valueHEX.value.g / 0xff,
      y: 1 - valueHEX.value.b / 0xff
    }, alpha.value)
  }),
  valueHSL = ref<ColorValueHSL>(rgbToHsl(valueRGB.value, alpha.value)),
  valueHSV = ref<ColorValueHSV>(rgbToHsv(valueRGB.value, alpha.value)),
  contrast = computed<string>(
    () => {
      const
        r = valueRGB.value.r / 255,
        g = valueRGB.value.g / 255,
        b = valueRGB.value.b / 255

      return ((r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) * 0.2126
        + (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) * 0.7152
        + (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)) * 0.0722) > 0.179
        ? 'black'
        : 'white'
    }
  ),
  colorModelForm = computed<Component>(() => getColorModelComponent(colorModel.value)),
  box = ref<HTMLElement>()

let rects: DOMRect

function pointerMoveHandle (event: PointerEvent) {
  if (rects) {
    const
      isHSV = colorModel.value !== COLOR_MODELS[3],
      x = Math.max(Math.min(event.clientX - rects.x, 255), 0),
      y = Math.max(Math.min(event.clientY - rects.y, 255), 0),
      xx = Math.round(x * 100 / 2.55) / 100,
      yy = Math.round(10000 - y * 100 / 2.55) / 100

    setValue(isHSV ? {
      model: COLOR_MODELS[4],
      h: valueHSV.value.h,
      s: xx,
      v: yy
    } as Omit<ColorValueHSV, 'value'> : {
      model: COLOR_MODELS[3],
      h: valueHSV.value.h,
      s: xx,
      l: yy
    } as Omit<ColorValueHSL, 'value'>)
  }
}


function pointerUpHandler (event: PointerEvent) {
  removeEventListener('pointermove', pointerMoveHandle)
  pointerMoveHandle(event)
}

function boxPointerDown (event: PointerEvent) {
  const target = event.target as HTMLElement

  if (target) {
    rects = target.getBoundingClientRect()
    console.log(event)
    addEventListener('pointermove', pointerMoveHandle)
    addEventListener('pointerup', pointerUpHandler, { once: true })
  }
}

function setValue (v: ModelValue | Omit<ColorValue, 'value'>): void {
  let rgb: ColorValueRGBLike
  if (typeof v !== 'object') {
    emits('update:modelValue', v)
    const n = typeof v === 'string' ? parseInt(v, 16) : v
    rgb = { r: n >> 16 & 0xff, g: n >> 8 & 0xff, b: n & 0xff }
  } else {
    if (v.model === COLOR_MODELS[0] || v.model === COLOR_MODELS[1]) {
      rgb = {
        r: (v as ColorValueRGB).r,
        g: (v as ColorValueRGB).g,
        b: (v as ColorValueRGB).b
      }
    } else if (v.model === COLOR_MODELS[2]) {
      valueCMY.value = { ...(v as ColorValueCMY), value: valueCMYValue((v as ColorValueCMY), alpha.value) }
      rgb = {
        r: Math.round((1 - (v as ColorValueCMY).c) * 255),
        g: Math.round((1 - (v as ColorValueCMY).m) * 255),
        b: Math.round((1 - (v as ColorValueCMY).y) * 255)
      }
    } else if (v.model === COLOR_MODELS[3]) {
      valueHSL.value = v as ColorValueHSL
      valueHSL.value.value = valueHSLValue(v as ColorValueHSL)
      rgb = hslToRgb(v as ColorValueHSL)
    } else {
      valueHSV.value = v as ColorValueHSV
      valueHSV.value.value = valueHSVValue(v as ColorValueHSV)
      rgb = hsvToRgb(v as ColorValueHSV)
    }
    emits(
      'update:modelValue',
      typeof props.modelValue === 'string'
        ? valueHEXValue(rgb, alpha.value)
        : rgb.r << 16 + rgb.g << 8 + rgb.b
    )
  }

  valueHEX.value = { model: COLOR_MODELS[0], ...rgb, value: valueHEXValue(rgb, alpha.value) }
  valueRGB.value = { model: COLOR_MODELS[1], ...rgb, value: valueRGBValue(rgb, alpha.value) }
  if (typeof v === 'object' && v.model !== COLOR_MODELS[2]) {
    const cmy = { c: 1 - rgb.r / 0xff, m: 1 - rgb.g / 0xff, y: 1 - rgb.b / 0xff }
    valueCMY.value = { model: COLOR_MODELS[2], ...cmy, value: valueCMYValue(cmy, alpha.value) }
  }
  if (typeof v === 'object' && v.model !== COLOR_MODELS[3]) {
    valueHSL.value = rgbToHsl(valueRGB.value, alpha.value, valueHSL.value.h)
  }
  if (typeof v === 'object' && v.model !== COLOR_MODELS[4]) {
    valueHSV.value = rgbToHsv(valueRGB.value, alpha.value, valueHSV.value.h)
  }
}

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

function copyColorModelValue (event: PointerEvent) {
  const target = event.target as HTMLElement

  if (navigator.clipboard) {
    navigator.clipboard.writeText(target.innerText)
  } else {
    console.warn('Clipboard API are not available!')
  }
}
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
    border: 1px solid var(--contrast);
    transform: translate(-5px, -5px);
    transition: border-color ease-in-out 0.25s;
    background-color: transparent;
    z-index: 1;
    left: 0;
    top: 0;

    &::after {
      content: ' ';
      display: block;
      left: 4px;
      top: 4px;
      position: relative;
      width: 1px;
      height: 1px;
      background-color: var(--contrast);
      border-radius: 1px;
      transition: background-color ease-in-out 0.25s;
    }
  }

  &__form,
  &__model {
    display: flex;
    flex-flow: column;
    gap: 8px;
  }

  &__color-model {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    white-space: nowrap;
    justify-content: space-between;

    &:not(&_option) small {
      font-size: 13px;
      cursor: copy;
    }
  }
}

</style>