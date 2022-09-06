<template>
  <h2>
    SSH Client
  </h2>

  <div>
    <code />
    <div
      ref="xTermContainer"
      class="xTermContainer"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { onMounted, onUnmounted, ref } from 'vue'
import xTermService from '@/services/xTermService'
import { Terminal } from 'xterm'

const
  xTerm = new Terminal(),
  xTermContainer = ref<HTMLElement>(),
  { options: xTermOptions } = xTerm

xTermOptions.customGlyphs = true
xTermOptions.fontFamily = 'JetBrains Mono, Consolas'
xTermOptions.fontSize = 16
xTermOptions.cursorBlink = true
xTermOptions.theme = {
  foreground: '#BBBBBB',
  background: '#1E1E1F',
  cursor: '#BBBBBB',
  cursorAccent: '#BBBBBB',
  selection: '#214283',
  // selectionForeground: '#string',
  black: '#000000',
  red: '#F0524F',
  green: '#5C962C',
  yellow: '#A68A0D',
  blue: '#3993D4',
  magenta: '#A771BF',
  cyan: '#00A3A3',
  white: '#808080',
  brightBlack: '#595959',
  brightRed: '#FF4050',
  brightGreen: '#4FC414',
  brightYellow: '#E5BF00',
  brightBlue: '#1FB0FF',
  brightMagenta: '#ED7EED',
  brightCyan: '#00E5E5',
  brightWhite: '#FFFFFF'
}

let timeoutId = -1

function createSession (container: HTMLElement) {
  if (document.fonts.check('16px JetBrains Mono', '~~')) {
    const session = xTermService.newXTermSession(xTerm, {
      username: '179da',
      host: 'localhost',
      port: 22,
      password: 'vxvjlte7Pto.'
    })
    xTerm.open(container)
    xTerm.onKey((data) => {
      session.key(data.key)
    })
  } else {
    timeoutId = setTimeout(createSession, 500, container)
  }
}

onMounted(() => {
  if (xTermContainer.value) {
    createSession(xTermContainer.value)
  } else {
    throw 'Element "xTermContainer is not found!"'
  }
})

onUnmounted(() => {
  if (timeoutId >= 0) {
    clearTimeout(timeoutId)
  }
})

</script>

<style
  lang="scss"
>
@import "xterm";
.xTermContainer {
  text-rendering: geometricPrecision;
  font-kerning : normal;

  canvas {
    text-rendering: geometricPrecision;
    font-kerning : normal;
  }
}
</style>