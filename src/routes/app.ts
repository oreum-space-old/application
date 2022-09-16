import type { RouteRecordRaw } from 'vue-router'

const app: Array<RouteRecordRaw> = [
  {
    name: 'Welcome',
    path: '/',
    component: () => import('@/views/WelcomeView.vue')
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/HomeView.vue'),
    meta: { main: true }
  }
]

export default app
