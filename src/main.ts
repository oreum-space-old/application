import icons from '@/library/icons'
import useApp from '@/stores/app'
import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'
import './styles/index.scss'
import OverDirective, { setApp } from '@/directives/OverDirective'

const app = createApp(App)
  .use(pinia)
  .use(icons)
  .use(router)

setApp(useApp())

app
  .directive('over', OverDirective)
  .mount('body')
