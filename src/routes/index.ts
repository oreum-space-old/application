import ui from '@/routes/ui'
import type { RouteRecordRaw } from 'vue-router'
import app from './app'

const routes: Array<RouteRecordRaw> = [
  ...app,
  ...ui
]

export default routes
