/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import mitt, { Emitter } from '@/utils/mitt'
import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '@/hooks/route'

const emitter: Emitter<Record<symbol, any>> = mitt()

// eslint-disable-next-line symbol-description
const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute) as RouteLocationNormalized
  emitter.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener() {
  emitter.clear()
}
