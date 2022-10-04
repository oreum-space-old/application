import useUser from '@/stores/user'
import { defineStore } from 'pinia'

interface ILanguage {
  id: string
  name: string
  flag: string
  percent: number
  loader: () => Promise<LanguageRecord>
}

type LanguageRecord = Record<string, string | undefined>

class Language implements ILanguage {
  id: string
  name: string
  flag: string
  percent: number
  record: LanguageRecord
  loader: () => Promise<LanguageRecord>

  private static empty = Symbol('empty')

  constructor (options: ILanguage) {
    this.id = options.id
    this.name = options.name
    this.flag = options.flag
    this.percent = options.percent
    this.record = {
      [Language.empty]: true
    }
    this.loader = options.loader
  }

  public async use () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.record[Language.empty]) {
      this.record = await this.loader()
    }
    return this
  }
}

type InitialState = {
  langs: Record<string, ILanguage>
  lang: Language
}

function createLoader (lang: string, langs: Record<string, () => Promise<string>>): ILanguage['loader'] {
  return async function () {
    return JSON.parse(await langs[lang]())
  }
}

const useLang = defineStore('lang', {
  state (): InitialState {
    return {
      langs: null as unknown as Record<string, ILanguage>,
      lang: null as unknown as Language
    }
  },
  actions: {
    async loadLangs () {
      const rawLangsOptions = await import.meta.globEager('@/assets/lang/options/*.json', { as: 'raw' })
      const langsOptions: Record<string, ILanguage> = {}
      const rawLangs = await import.meta.glob('@/assets/lang/*.json', { as: 'raw' })

      for (const [key, loader] of Object.entries(rawLangs)) {
        rawLangs[key.slice(-7, -5)] = loader
      }

      for (const key in rawLangsOptions) {
        const langOptions = JSON.parse(rawLangsOptions[key]) as ILanguage

        langsOptions[langOptions.id] = { ...langOptions, loader: createLoader(langOptions.id, rawLangs) }
      }

      this.langs = langsOptions
    },
    defineCurrentLang (lang?: string) {
      // defined -> user -> localStorage -> navigator -> english
      if (lang && this.langs[lang]) {
        return lang
      }

      if (useUser.name) {
        console.log('TODO: loadLang user')
      }

      const ls = localStorage.getItem('lang')
      if (ls && this.langs[ls]) {
        return ls
      }

      const nv = navigator.language.slice(0, 2)
      if (nv && this.langs[nv]) {
        return nv
      }

      return 'en'
    },
    async loadLang (lang?: string) {
      this.lang = await new Language(this.langs[this.defineCurrentLang(lang)]).use()
    },
    async saveLang (lang: string) {
      // user -> localStorage
      window.localStorage.setItem('lang', lang)
    },
    l (key: string | TemplateStringsArray) {
      const _key = typeof key === 'string' ? key : key[0]
      return this.lang.record[_key] || _key
    }
  }
})

export default useLang