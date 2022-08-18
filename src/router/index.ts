import query from '@/library/query'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../routes'

declare module 'vue-router' {
  interface RouteMeta {
    main?: boolean,
    permissions?: number
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  parseQuery: query.parse,
  stringifyQuery: query.stringify
})

export default router
