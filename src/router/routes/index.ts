import { AddRouteRecordRaw } from '../types'
import sign from './sign'
import home from './home'

const routes: Array<AddRouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '首页入口'
    }
  },
  ...sign,
  ...home,
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    hidden: true,
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404'
    }
  }
]

export default routes
