import UiInputColorHsvBox from './UiInputColorHsvBox.vue'
import UiInputColorHslBox from './UiInputColorHslBox.vue'
import UiInputColorRgbModel from './UiInputColorRgbModel.vue'
import UiInputColorHslModel from './UiInputColorHslModel.vue'
import UiInputColorHsvModel from './UiInputColorHsvModel.vue'
import UiInputColorCmyModel from './UiInputColorCmyModel.vue'

export const COLOR_MODELS = ['HEX', 'RGB', 'CMY', 'HSL', 'HSV'] as const
export type ColorModel = typeof COLOR_MODELS[number]

export type ColorValueHEX = {
  model: ColorModel[0],
  r: number, // 0 - 255
  g: number, // 0 - 255
  b: number, // 0 - 255
  value: `#${string}`
}

export type ColorValueRGB = {
  model: ColorModel[1],
  r: number, // 0 - 255
  g: number, // 0 - 255
  b: number, // 0 - 255
  value: `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${string})`
}

export type ColorValueCMY = {
  model: ColorModel[2],
  c: number, // 0 - 1
  m: number, // 0 - 1
  y: number, // 0 - 1
  value: `cmy(${string}, ${string}, ${string})` | `cmya(${string}, ${string}, ${string}, ${string})`
}

export type ColorValueHSL = {
  model: ColorModel[3],
  h: number, // 0 - 359.(9)
  s: number, // 0 - 100
  l: number, // 0 - 100
  value: `hsl(${number}deg, ${number}%, ${number}%)` | `hsl(${number}deg, ${number}%, ${number}%${string})`
}

export type ColorValueHSV = {
  model: ColorModel[4],
  h: number, // 0 - 359.(9)
  s: number, // 0 - 100
  v: number, // 0 - 100
  value: `hsv(${number}deg, ${number}%, ${number}%)` | `hsv(${number}deg, ${number}%, ${number}%${string})`
}

export type ColorValue = ColorValueHEX | ColorValueRGB | ColorValueCMY | ColorValueHSL | ColorValueHSV

export type ColorValueRGBLike = Omit<ColorValueHEX | ColorValueRGB, 'value' | 'model'>

type ColorBoxComponent = typeof UiInputColorHsvBox | typeof UiInputColorHslBox

export function getColorBox (colorModel: ColorModel): ColorBoxComponent {
  if (colorModel === 'HSL') {
    return UiInputColorHslBox
  }
  return UiInputColorHsvBox
}

type ColorModelComponent = typeof UiInputColorRgbModel
  | typeof UiInputColorHslModel
  | typeof UiInputColorHsvModel
  | typeof UiInputColorCmyModel

export function getColorModelComponent (colorModel: ColorModel): ColorModelComponent {
  if (colorModel === 'HSL') {
    return UiInputColorHslModel
  }
  if (colorModel === 'HSV') {
    return UiInputColorHsvModel
  }
  if (colorModel === 'CMY') {
    return UiInputColorCmyModel
  }
  return UiInputColorRgbModel
}

export function rgbToHsl (colorValue: ColorValueRGBLike, alpha?: number): ColorValueHSL {
  return {
    model: COLOR_MODELS[3],
    h: 0,
    s: 0,
    l: 0,
    value: `hsl(0deg, 0%, 0%)`
  }
}

export function hslToRgb (colorValue: ColorValueHSV): ColorValueRGBLike {
  return {
    r: 0,
    g: 0,
    b: 0
  }
}

export function rgbToHsv ({ r, g, b }: ColorValueRGBLike, alpha?: number): ColorValueHSV {
  const
    rAbs = r / 255,
    gAbs = g / 255,
    bAbs = b / 255,
    hsv: ColorValueHSV = {
      model: COLOR_MODELS[4],
      h: Math.max(rAbs, gAbs, bAbs),
      s: 0,
      v: 0,
      value: 'hsv(0deg, 0%, 0%)'
    }

  const
    d = hsv.v - Math.min(rAbs, gAbs, bAbs),
    c = (c: number) => (hsv.v - c) / 6 / d + 1 / 2,
    p = (n: number) => Math.round(n * 100) / 100

  if (d === 0) {
    hsv.h = hsv.s = 0
  } else {
    hsv.s = d / hsv.v

    const
      _r = c(rAbs),
      _g = c(gAbs),
      _b = c(bAbs)

    if (rAbs === hsv.v) {
      hsv.h = _b - _g
    } else if (gAbs === hsv.v) {
      hsv.h = (1 / 3) + _r - _b
    } else if (bAbs === hsv.v) {
      hsv.h = (2 / 3) + _g - _r;
    }

    if (hsv.h < 0) {
      hsv.h += 1
    } else if (hsv.h >= 1) {
      hsv.h -= 1
    }
  }

  hsv.h = Math.round(hsv.v * 360)
  hsv.s = p(hsv.s * 100)
  hsv.v = p(hsv.v * 100)
  hsv.value = `hsv(${hsv.h}deg, ${hsv.s}%, ${hsv.v}%${alpha !== undefined ? ` / ${alpha.toFixed(3)}%` : ''})`

  return hsv
}

export function hsvToRgb (hsv: ColorValueHSV): ColorValueRGBLike {
  const
    h = hsv.h / 360,
    s = hsv.s / 100,
    v = hsv.v / 100

  const
    i = Math.floor(h * 6),
    f = h * 6 - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s)

  let r, g, b

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
    default: r = 0; g = 0; b = 0; break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}