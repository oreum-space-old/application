import query from '@/library/query'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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

export function removeRoutes (routeNames: Array<RouteRecordRaw['name']>): void {
  for (const name of routeNames) {
    if (name) {
      router.removeRoute(name)
    }
  }
}

export function addRoutes (routes: Array<RouteRecordRaw>): void {
  for (const route of routes) {
    router.addRoute(route)
  }
}

export default router
