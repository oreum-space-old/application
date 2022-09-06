import type { RouteRecordRaw } from 'vue-router'

const dashboard: Array<RouteRecordRaw> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    children: [
      {
        name: 'Dashboard Terminal',
        path: '/dashboard/terminal',
        component: () => import('@/views/dashboard/DashboardTerminal.vue')
      }
    ]
  },
  {
    name: 'Dashboard Table',
    path: '/dashboard/table/:table',
    component: () => import('@/views/dashboard/DashboardTable.vue')
  }
]

export default dashboard
