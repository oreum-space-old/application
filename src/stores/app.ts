import useDialog from '@/stores/dialog'
import useLang from '@/stores/lang'
import { defineStore } from 'pinia'
import Favicon from '@/library/favicon'

const themes = ['light', 'dark'] as const
const favicon = new Favicon()

type Theme = typeof themes[number]

type State = {
  width: number
  height: number
  root: HTMLElement
  theme: Theme
  menu: 'disabled' | 'shown' | 'hidden'
  favicon: Favicon
}

function getThemeFromMedia (): Theme {
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'
}

function getLocalStorageTheme (): Theme | null {
  const result = localStorage.getItem('theme')

  return result === 'light' || result === 'dark' ? result : null
}

let dialog: ReturnType<typeof useDialog>

const useApp = defineStore('app', {
  state: (): State => ({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
    root: document.documentElement,
    menu: window.innerWidth >= 768 ? 'disabled' : 'hidden',
    theme: getLocalStorageTheme() || getThemeFromMedia() || 'dark',
    favicon
  }),
  actions: {
    async load () {
      const lang = useLang()

      await lang.loadLangs()
      await lang.loadLang()
      this.created()
    },
    created (): void {
      addEventListener('resize', this.resizeHandler)
      this.resizeMenuHandler()
      this.resizeCssHandler()
      this.watchThemeFromMedia()
    },
    resizeHandler (): void {
      this.width = window.innerWidth || 0
      this.height = window.innerHeight || 0
      this.resizeMenuHandler()
      this.resizeCssHandler()
    },
    resizeMenuHandler (): void {
      if (this.menu !== 'disabled') {
        if (this.width >= 768) {
          this.setMenu('disabled')
        }
      } else {
        if (this.width < 768) {
          this.setMenu('hidden')
        }
      }
    },
    hideDialog () {
      if (!dialog) {
        dialog = useDialog()
      }
      dialog.hide()
    },
    toggleMenu () {
      this.setMenu(this.menu === 'shown' ? 'hidden' : void this.hideDialog() || 'shown')
    },
    setMenu (value: State['menu']) {
      this.menu = value
      document.documentElement.classList[value === 'shown' ? 'add' : 'remove']('menu-prevent-scrolling')
    },
    resizeCssHandler (): void {
      const vh = `${this.height / 100}px`

      if (this.getStyle('--vh') !== vh) {
        this.root.style.setProperty('--vh', vh)
      }
    },
    getStyle (property: string): string {
      return this.root.style.getPropertyValue(property)
    },
    setTheme (theme: Theme): void {
      this.theme = theme
      this.favicon.light = theme === 'light'
    },
    watchThemeFromMedia () {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', event => {
          if (!getLocalStorageTheme()) {
            this.setTheme(event.matches ? 'dark' : 'light')
          }
        })
    }
  }
})

export default useApp
