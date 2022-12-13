import { RouteRecordRaw, RouteMeta } from 'vue-router'
// 给路由属性添加hidden
export interface AddRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta
}
