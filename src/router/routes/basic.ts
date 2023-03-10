import { t } from '@/hooks/web/useI18n'
import { AddRouteRecordRaw } from '../types'
const Layout = () => import('@/layout/index.vue')

export const LOGIN_ROUTE: AddRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: t('routes.basic.login')
  }
}

export const PAGE_NOT_FOUND_ROUTE: AddRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
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
  component: Layout,
  name: 'RedirectTo',
  meta: {
    title: 'redirect',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/layout/redirect/index.vue'),
      meta: {
        title: 'redirect'
      }
    }
  ]
}

// export const ERROR_LOG_ROUTE: AddRouteRecordRaw = {
//   path: '/error-log',
//   name: 'ErrorLog',
//   component: Layout,
//   redirect: '/error-log/list',
//   meta: {
//     title: 'ErrorLog',
//     hideBreadcrumb: true,
//     hideMenu: true
//   },
//   children: [
//     {
//       path: 'list',
//       name: 'ErrorLogList',
//       component: () => import('@/views/error/404.vue'),
//       meta: {
//         title: 'ErrorLogList'
//       }
//     }
//   ]
// }
