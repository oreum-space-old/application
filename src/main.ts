import './styles/index.scss'
import globalListeners from '@/library/globalListeners'
import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'

createApp(App)
  .use(pinia)
  .use(router)
  .use(globalListeners)
  .mount('body')

if (!import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import('https://accounts.google.com/gsi/client')
}

