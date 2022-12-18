import { AddRouteRecordRaw } from '../types'
import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'

// 根路由
export const RootRoute: AddRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root'
  }
}

export const basicRoutes: Array<AddRouteRecordRaw> = [
  RootRoute,
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE
]
