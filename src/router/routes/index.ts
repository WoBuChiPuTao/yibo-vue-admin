import { AddRouteRecordRaw } from '../types'
import sign from './sign'

const routes: Array<AddRouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '首页入口'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    hidden: true,
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404'
    }
  },
  ...sign
]

export default routes
