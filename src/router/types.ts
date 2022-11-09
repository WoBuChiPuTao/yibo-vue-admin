import { RouteRecordRaw, RouteMeta } from 'vue-router'

export interface AddRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta
  hidden?: boolean
}
