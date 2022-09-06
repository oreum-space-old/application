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
  favicon: Favicon
}

function getThemeFromMedia (): Theme {
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'
}

function getLocalStorageTheme (): Theme | null {
  const result = localStorage.getItem('theme')

  return result === 'light' || result === 'dark' ? result : null
}

const useApp = defineStore('app', {
  state: (): State => ({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
    root: document.documentElement,
    theme: getLocalStorageTheme() || getThemeFromMedia() || 'dark',
    favicon
  }),
  actions: {
    created (): void {
      addEventListener('resize', this.resizeHandler)
      addEventListener('jump', (event) => {
        console.log(event)
      })
      this.resizeCssHandler()
      this.watchThemeFromMedia()
    },
    resizeHandler (): void {
      this.width = window.innerWidth || 0
      this.height = window.innerHeight || 0
      this.resizeCssHandler()
    },
    resizeCssHandler (): void {
      this.root.style.setProperty('--vh', `${this.height / 100}px`)
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
