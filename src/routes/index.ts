import dashboard from '@/routes/dashboard'
import ui from '@/routes/ui'
import type { RouteRecordRaw } from 'vue-router'
import app from './app'

const routes: Array<RouteRecordRaw> = [
  ...app,
  ...ui,
  ...dashboard
]

export default routes
