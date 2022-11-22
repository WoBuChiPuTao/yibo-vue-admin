import { AddRouteRecordRaw } from '../types'
import {
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ERROR_LOG_ROUTE
} from './basic'

// 根路由
export const RootRoute: AddRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/layout',
  meta: {
    title: 'Root'
  }
}

export const basicRoutes: Array<AddRouteRecordRaw> = [
  RootRoute,
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE,
  ERROR_LOG_ROUTE,
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/LayoutView.vue'),
    redirect: '/layout/home',
    meta: {
      title: '系统布局'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页'
        }
      }
    ]
  }
]
