import type { RouteRecordRaw } from 'vue-router'

const ui: Array<RouteRecordRaw> = [
  {
    name: 'User Interfaces',
    path: '/ui',
    component: () => import('@views/ui/UiView.vue'),
    meta: { main: true }
  }
]

export default ui
