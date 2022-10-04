<template>
  <div
    ref="appScroll"
    class="app-scroll"
    :style="{
      height: appScrollHeight + 'px'
    }"
    @pointerdown.stop="scrollDownHandler"
  >
    <div
      ref="appScrollThumb"
      class="app-scroll__thumb"
      :style="{
        height: appScrollThumbHeight + '%',
        top: appScrollThumbTop + '%'
      }"
      @pointerdown.stop="scrollThumbDownHandler"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>

import useApp from '@/stores/app'
import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

const
  appScroll = ref<HTMLElement>() as Ref<HTMLElement>,
  appScrollThumb = ref<HTMLElement>() as Ref<HTMLElement>,
  app = useApp(),
  page = document.documentElement,
  appScrollHeight = ref<number>(app.height - 64),
  appScrollThumbHeight = ref<number>(0),
  appScrollThumbTop = ref<number>(0),
  router = useRouter()

let
  header: Element | null = null,
  footer: Element | null = null


router.afterEach(() => {
  setTimeout(scrollHandler)
})

function calculateHeight () {
  if (header && footer) {
    const windowHeightWithoutHeader = app.height - header.clientHeight
    const footerHeightOnWindow = Math.min(0, page.scrollHeight - page.scrollTop - app.height - footer.clientHeight)
    appScrollHeight.value = windowHeightWithoutHeader + footerHeightOnWindow

    const appHeightToWindow = app.height / page.scrollHeight
    // console.log(appHeightToWindow, (page.scrollTop / (page.scrollHeight - app.height)))

    appScrollThumbHeight.value = appHeightToWindow * 100
    appScrollThumbTop.value = page.scrollTop / (page.scrollHeight - app.height) * (100 - appScrollThumbHeight.value)
  }
}

app.$subscribe(({ events }) => {
  if (events instanceof Array) {
    return
  }
  if (events.oldValue !== events.newValue) {
    if (events.key === 'height') {
      return scrollHandler()
    }
  }
})

function scrollHandler () {
  if (app.width > 768) {
    calculateHeight()
  }
}

addEventListener('scroll', scrollHandler)
addEventListener('resize', scrollHandler)
onMounted(() => {
  header = document.getElementById('header') as Element
  footer = document.getElementById('footer') as Element
  scrollHandler()
})
onUnmounted(() => {
  removeEventListener('resize', scrollHandler)
  removeEventListener('scroll', scrollHandler)
})

function scrollDownHandler (event: PointerEvent) {
  if (app.width > 768) {
    console.log('scrollDownHandler')
    // start = event.pageY
    document.documentElement.classList.add('scrollbar-prevent-scrolling')
    addEventListener('pointermove', scrollThumbMoveHandler)
    addEventListener('pointerup', scrollThumbUpHandler, { once: true })
    scrollThumbMoveHandler(event)
  }
}

function scrollThumbMoveHandler (event: PointerEvent) {
  if (header && footer) {
    const appScrollThumbHeight = appScrollThumb.value.clientHeight
    const half = appScrollThumbHeight / 2
    const diff = (event.y - header.clientHeight - half) / (app.height - header.clientHeight - appScrollThumbHeight)
    // (appScrollHeight.value - appScrollThumbHeight)
    // console.log(diff, event.screenY)
    // console.log(diff, (event.pageY - header.clientHeight) /
    // appScrollHeight.value, (page.scrollHeight - page.scrollTop) * diff)
    // console.log(event.y, diff)
    const scrollBound = page.scrollHeight - app.height
    page.scrollTop = Math.max(Math.min((scrollBound) * diff, scrollBound), 0)
  }
}
function scrollThumbUpHandler () {
  removeEventListener('pointermove', scrollThumbMoveHandler)
  document.documentElement.classList.remove('scrollbar-prevent-scrolling')
}
function scrollThumbDownHandler (event: PointerEvent) {
  if (app.width > 768) {
    document.documentElement.classList.add('scrollbar-prevent-scrolling')
    addEventListener('pointermove', scrollThumbMoveHandler)
    addEventListener('pointerup', scrollThumbUpHandler, { once: true })
    scrollThumbMoveHandler(event)
  }
}
</script>

<style lang="scss">
.app-scroll {
  user-select: none;
  -webkit-user-drag: none;
  position: fixed;
  right: 0;
  top: 64px;
  width: 6px;
  height: calc(var(--vhf) - 64px);
  background-color: transparent;
  // background-color: red !important;
  // border: 2px solid blue;
  transition: background-color 250ms linear, width ease-in-out 250ms;
  // padding: 0;

  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    background-color: var(--surface-c);
    width: 12px;

    .app-scroll__thumb {
      border-width: 2px;
    }
  }

  &__thumb {
    transition: border ease-in-out 250ms;
    background-clip: content-box;
    background-color: var(--surface-d);
    border: 1px solid transparent;
    // background-color: green;
    position: relative;
    width: 100%;
    border-radius: 6px;

    &::before {
      position: absolute;
      content: ' ';
      width: 66.6666%;
      padding-block: 33.3334%;
      background-color: var(--surface-d);
      left: 0;
      top: 50%;
      translate: 33% -50%;
      border-radius: 4px;
    }
  }
}
</style>