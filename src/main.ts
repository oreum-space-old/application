import icons from '@/library/icons'
import useApp from '@/stores/app'
import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import './styles/index.scss'
import query from '@/library/query'

const app = createApp(App)
app.use(pinia)

const appStore = useApp()

const _oreum_space = {
  app,
  states: {
    app: appStore
  },
  router,
  query
}

declare global {
  interface Window {
    oreum_space: typeof _oreum_space
  }
}

window.oreum_space = _oreum_space
app.use(icons)
app.use(router)
app.mount('body')
