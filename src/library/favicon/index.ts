type FaviconProperty = 'loading' | 'message' | 'trade' | 'light'

type FaviconProperties = Record<FaviconProperty, boolean>

const p: FaviconProperties = {
  light: false,
  loading: false,
  message: false,
  trade: false
}

export default class Favicon {
  private readonly element: HTMLLinkElement

  constructor () {
    this.element = document.getElementById('favicon') as HTMLLinkElement
    this.update()
  }

  change (partial: Partial<FaviconProperties>) {
    const keys = Object.keys(partial) as Array<FaviconProperty>
    for (const key of keys) {
      const value = partial[key]
      if (value !== undefined) {
        p[key] = value
      }
    }
    this.update()
  }

  get light (): boolean {
    return p.light
  }

  set light (v: boolean) {
    p.light = v
    this.update()
  }

  get loading (): boolean {
    return p.loading
  }

  set loading (v: boolean) {
    p.loading = v
    this.update()
  }

  get message (): boolean {
    return p.message
  }

  set message (v: boolean) {
    p.message = v
    this.update()
  }

  get trade (): boolean {
    return p.trade
  }

  set trade (v: boolean) {
    p.trade = v
    this.update()
  }

  private update () {
    this.element.setAttribute(
      'href',
      `/favicons/favicon${
        p.light ? 'Light' : '' }${
        p.loading ? 'Loading' : '' }${
        p.message ? 'Message' : '' }${
        p.trade ? 'Trade' : '' }.svg`
    )
  }
}

