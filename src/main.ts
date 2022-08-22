import OverDirective from '@/directives/OverDirective'
import icons from '@/library/icons'
import useApp from '@/stores/app'
import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import './styles/index.scss'

createApp(App)
  .directive('over', OverDirective)
  .use(pinia)
  .use(icons)
  .use(router)
  .mount('body')

useApp()
