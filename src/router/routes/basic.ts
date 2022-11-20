import { AddRouteRecordRaw } from '../types'

export const LOGIN_ROUTE: AddRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const PAGE_NOT_FOUND_ROUTE: AddRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'not found',
  component: () => import('@/views/layout/LayoutView.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'not found children',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const REDIRECT_ROUTE: AddRouteRecordRaw = {
  path: '/redirect',
  component: () => import('@/views/layout/LayoutView.vue'),
  name: 'RedirectTo',
  meta: {
    title: 'redirect',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      component: () => import('@/views/layout/LayoutView.vue'),
      meta: {
        title: 'redirect'
      }
    }
  ]
}

export const ERROR_LOG_ROUTE: AddRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: () => import('@/views/layout/LayoutView.vue'),
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog'
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: 'ErrorLogList'
      }
    }
  ]
}
