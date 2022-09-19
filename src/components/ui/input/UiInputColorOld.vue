<template>
  <div
    ref="wrapper"
    class="ui-color-picker"
  >
    <div
      ref="button"
      class="ui-color-picker__button ui-button"
      :style="{
        backgroundColor: texts.hex,
        color: textColor
      }"
      @click="visible = !visible"
    >
      {{ texts.hex }}
    </div>
    <div
      ref="popover"
      class="ui-color-picker__popover"
    >
      <div
        class="ui-color-picker__picker"
        :style="{
          backgroundColor: `hsl(${h}deg 100% 50%)`
        }"
      >
        <div
          class="ui-color-picker__pointer"
          :style="{
            bottom: `calc(${isFinite(sv.v) ? sv.v : 0} * 255px)`,
            left: `calc(${isFinite(sv.s) ? sv.s : 0} * 255px)`,
            '--color': sl.l < 0.5 ? 'white' : 'black'
          }"
        />
      </div>
      <div
        class="ui-color-picker__form"
      >
        <ui-select
          v-model="colorModel"
          :options="colorModelsOptions"
        />
        <ui-color-slider
          v-model="h"
          :background="'linear-gradient(90deg, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 66%, #f0f 83%, #f00 100%)'"
          :max="360"
          label="H"
        />
        <template v-if="colorModel.value === 'hex' || colorModel.value === 'rgb'">
          <ui-color-slider
            v-model="r"
            :background="[`rgb(0, ${g}, ${b})`, `rgb(255, ${g}, ${b})`]"
            label="R"
          />
          <ui-color-slider
            v-model="g"
            :background="[`rgb(${r}, 0, ${b})`, `rgb(${r}, 255, ${b})`]"
            label="G"
          />
          <ui-color-slider
            v-model="b"
            :background="[`rgb(${r}, ${g}, 0)`, `rgb(${r}, ${g}, 255)`]"
            label="B"
          />
          <span>
            <span>
              SV S: {{ Math.round(sv.s * 100) }}
            </span><br>
            <span>
              SV V: {{ Math.round(sv.v * 100) }}
            </span><br>
            <span>
              SL S: {{ Math.round(sl.s * 100) }}
            </span><br>
            <span>
              SL L: {{ Math.round(sl.l * 100) }}
            </span>
          </span>
        </template>
        <template v-else-if="colorModel.value === 'hsv'">
          <ui-color-slider
            :model-value="Math.round(sv.s * 100)"
            :background="[`hsl(${h} 0% ${sv.v * 50}%)`, `hsl(${h} 100% ${sv.v * 50}%)`]"
            label="S"
            :max="100"
            @update:model-value="sv = { ...sv, s: $event / 100 }"
          />
          <ui-color-slider
            :model-value="Math.round(sv.v * 100)"
            :background="[`black`, `hsl(${h} ${sv.s * 100}% ${sv.v * 50}%)`]"
            label="V"
            :max="100"
            @update:model-value="sv = { ...sv, v: $event / 100 }"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiColorSlider from '@/components/ui/UiColorSlider.vue'
import appPreventOverflow from '@/consts/appPreventOverflow'
import updateVisibility from '@/library/updateVisibility'
import { createPopper, flip, Instance } from '@popperjs/core'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import UiSelect from '@/components/UiSelect.vue'

const COLOR_MODELS = ['hex', 'rgb', 'hsl', 'hsv'] as const
const colorModelsOptions = COLOR_MODELS.map(_ => ({ display: _.toUpperCase(), value: _ }))

type ColorModels = typeof COLOR_MODELS[number]
type ModelValue = string | number
type Props = {
  modelValue: ModelValue
  alpha?: boolean
  defaultColorModel?: ColorModels
}

const
  props = defineProps<Props>(),
  emits = defineEmits<{
    (e: 'update:modelValue', modelValue: ModelValue): void
  }>(),
  _colorModel = ref(colorModelsOptions.find(_ => _.value === props.defaultColorModel) || colorModelsOptions[0]),
  colorModel = computed<typeof _colorModel['value']>({
    get () {
      return _colorModel.value
    },
    set (v) {
      if (v.value[1] === 's') {
        _h.value = h.value
      }
      if (v.value === 'hsl') {
        _s.value = sl.value.s
        _l.value = sl.value.l
      }
      if (v.value === 'hsv') {
        _s.value = sv.value.s
        _v.value = sv.value.v
      }
      _colorModel.value = v
    }
  }),
  value = computed<number>({
    get (): number {
      return typeof props.modelValue === 'string'
        ? parseInt(props.modelValue.slice(1), 0x10)
        : props.modelValue
    },
    set (_: number): void {
      emits('update:modelValue', props.alpha ? texts.value[colorModel.value.value] : _)
    }
  }),
  r = computed<number>({
    get () {
      return (value.value >> (
        props.alpha ? 24 : 16
      )) & 0xff
    },
    set (_: number): void {
      value.value = value.value & (props.alpha ? 0x00ffffff : 0x00ffff) | (_ << (props.alpha ? 24 : 16))
    }
  }),
  g = computed<number>({
    get () {
      return value.value >> (
        props.alpha ? 16 : 8
      ) & 0xff
    },
    set (_: number): void {
      value.value = value.value & (props.alpha ? 0xff00ffff : 0xff00ff) | (_ << (props.alpha ? 16 : 8))
    }
  }),
  b = computed<number>({
    get () {
      return value.value >> (
        props.alpha ? 8 : 0
      ) & 0xff
    },
    set (_: number): void {
      value.value = value.value & (props.alpha ? 0xffff00ff : 0xffff00) | (_ << (props.alpha ? 8 : 0))
    }
  }),
  a = computed<number>({
    get () {
      return props.alpha ? 0xff : value.value & 0xff
    },
    set (_: number): void {
      if (props.alpha) {
        value.value = value.value & 0xffffff00 | _
      }
    }
  }),
  _h = ref<number>(0),
  _s = ref<number>(0),
  _v = ref<number>(0),
  _l = ref<number>(0),
  h = computed<number>({
    get (): number {
      if (colorModel.value.value.startsWith('hs')) {
        return _h.value
      }
      let hue = 0
      const min = Math.min(r.value, g.value, b.value)
      const max = Math.max(r.value, g.value, b.value)

      if (min === max) {
        return hue
      }

      if (max === r.value) {
        hue = (g.value - b.value) / (max - min)
      } else if (max === g.value) {
        hue = 2 + (b.value - r.value) / (max - min)
      } else {
        hue = 4 + (r.value - g.value) / (max - min)
      }

      hue *= 60
      if (hue < 0) {
        hue += 360
      }

      return Math.round(hue)
    },
    set (_: number): void {
      _h.value = _
      console.log('todo')
    }
  }),
  sl = computed<{ s: number, l: number }>({
    get () {
      if (colorModel.value.value === 'hsl') {
        return {
          s: _s.value,
          l: _l.value
        }
      }
      const
        rabs = r.value / 255,
        gabs = g.value / 255,
        babs = b.value / 255,
        l = Math.max(rabs, gabs, babs),
        s = l - Math.min(rabs, gabs, babs)

      return {
        s: (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (2 * l - s) / 2
      }
    },
    set (sl) {
      if (colorModel.value.value === 'hsl') {
        _s.value = sl.s
        _l.value = sl.l
      }
      console.log('todo')
    }
  }),
  sv = computed<{ s: number, v: number }>({
    get () {
      if (colorModel.value.value === 'hsv') {
        return {
          s: _s.value,
          v: _v.value
        }
      }
      const
        rabs = r.value / 255,
        gabs = g.value / 255,
        babs = b.value / 255,
        v = Math.max(rabs, gabs, babs)

      return {
        s: (v - Math.min(rabs, gabs, babs)) / v,
        v
      }
    },
    set ({ s, v }: { s: number, v: number }) {
      if (colorModel.value.value === 'hsv') {
        _s.value = s
        _v.value = v
      }
      console.log(h.value / 60, s, v)
      let _r, _g, _b, i, f, p, q, t
      i = Math.floor(h.value / 60)
      f = h.value / 60 - i
      p = v * (1 - s)
      q = v * (1 - f * s)
      t = v * (1 - (1 - f) * s)
      switch (i % 6) {
        case 0:
          _r = v
          _g = t
          _b = p
          break
        case 1:
          _r = q
          _g = v
          _b = p
          break
        case 2:
          _r = p
          _g = v
          _b = t
          break
        case 3:
          _r = p
          _g = q
          _b = v
          break
        case 4:
          _r = t
          _g = p
          _b = v
          break
        case 5:
          _r = v
          _g = p
          _b = q
          break
      }
      r.value = Math.abs(Math.round((_r || 0) * 255))
      g.value = Math.abs(Math.round((_g || 0) * 255))
      b.value = Math.abs(Math.round((_b || 0) * 255))
    }
  }),
  /*
  l = computed<number>({
    get () {
      const min = Math.min(r.value, g.value, b.value) / 255
      const max = Math.max(r.value, g.value, b.value) / 255

      return ((max + min) / 2)
    },
    set (_: number): void {
      console.log('todo')
    }
  }),
  s = computed<number>({
    get () {
      const min = Math.min(r.value, g.value, b.value) / 255
      const max = Math.max(r.value, g.value, b.value) / 255

      console.log(min, max, (max - min), Math.abs(1 - 2 * l.value - 1), (max - min) / Math.abs(1 - 2 * l.value - 1))
      return ((max - min) / (1 - Math.abs(1 - (max + min))))
    },
    set (_: number): void {
      console.log('todo')
    }
  }),
  v = computed<number>({
    get () {
      return 0
    },
    set (_: number): void {
      console.log('todo')
    }
  }), */
  textColor = computed(() => r.value + g.value + b.value > 0x18 ? 'black' : 'white'),
  texts = computed<Record<ColorModels, string>>(() => ({
    hex: `#${ value.value.toString(0x10).toUpperCase().padStart(6, '0') }`,
    rgb: `rgb${props.alpha ? 'a' : ''}(${r.value}, ${g.value}, ${b.value})`,
    hsl: `hsl(${h.value}deg ${sl.value.s} ${sl.value.l}${props.alpha ? ' \\ .' + a.value / 255 : ''})`,
    hsv: `hsv(${h.value}deg ${sv.value.s} ${sv.value.v}${props.alpha ? ' \\ .' + a.value / 255 : ''})`
  })),
  button = ref<HTMLElement>(),
  popover = ref<HTMLElement>(),
  wrapper = ref<HTMLElement>(),
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
        appPreventOverflow,
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

<style
  lang="scss"
>
.ui-color-picker {
  max-width: fit-content;
  max-height: fit-content;

  &__button {
    display: flex;
    text-align: center;
    width: 96px;
    border-width: 1px;
    border-style: solid;
    outline: solid 2px;
    outline-offset: -2px;

    &:not(:hover):not(:focus) {
      outline-color: transparent !important;
    }
  }

  &__popover {
    display: flex;
    flex-flow: column;
    padding: 24px;
    background-color: var(--surface-overlay);
    box-shadow: var(--surface-overlay-shadow);
    border-radius: 12px;
    gap: 16px;
    z-index: 1;
    user-select: none;
    -webkit-user-drag: none;

    @media (min-height: 768px) and (min-width: 768px) {
      flex-flow: row;
    }

    .ui-input {
      width: 256px;
    }
  }

  &__picker {
    position: relative;
    width: 256px;
    height: 256px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
      linear-gradient(90deg, #FFFFFF 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #FF5E00;
  }

  &__form {
    display: flex;
    flex-flow: column;
    gap: 8px;
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
}
</style>