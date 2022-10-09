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
  },
  {
    name: 'CodeActivation',
    path: '/code-activation/:link',
    component: () => import('@views/CodeActivationView.vue'),
    props: true,
    meta: { main: true }
  },
  {
    name: 'LinkActivation',
    path: '/link-activation/:link',
    component: () => import('@views/LinkActivationView.vue'),
    props: true,
    meta: { main: true }
  }
]

export default app
