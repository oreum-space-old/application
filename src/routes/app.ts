import type { RouteRecordRaw } from 'vue-router'

const app: Array<RouteRecordRaw> = [
  {
    name: 'Welcome',
    path: '/',
    component: () => import('@/views/WelcomeView.vue'),
    meta: { main: true }
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/HomeView.vue'),
    meta: { main: true }
  },
  {
    name: 'Registration',
    path: '/registration',
    component: () => import('@/views/RegistrationView.vue'),
    meta: { main: true }
  }
]

export default app
