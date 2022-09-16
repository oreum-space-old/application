import globalListeners from '@/library/globalListeners'
import icons from '@/library/icons'
import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import './styles/index.scss'

createApp(App)
  .use(pinia)
  .use(icons)
  .use(router)
  .use(globalListeners)
  .mount('body')

