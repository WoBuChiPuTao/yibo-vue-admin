import { RouteRecordRaw, RouteMeta } from 'vue-router'
// 给路由属性添加hidden

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface AddRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta;
  children?: AddRouteRecordRaw[];
}
