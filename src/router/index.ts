import query from '@/library/query'
import useApp from '@/stores/app'
import useDialog from '@/stores/dialog'
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

let app: ReturnType<typeof useApp>
let dialog: ReturnType<typeof useDialog>

router.beforeEach(() => {
  if (!dialog) {
    dialog = useDialog()
  }
  if (!app) {
    app = useApp()
  }
  if (app.menu === 'shown') {
    app.setMenu('hidden')
  }
  if (dialog.openedDialogs.length) {
    dialog.hide()
  }
})

export default router
