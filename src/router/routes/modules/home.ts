import { AddRouteRecordRaw } from '../../types'

export const home: Array<AddRouteRecordRaw> = [
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/layout/home',
    meta: {
      title: '系统布局'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        props: true,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页'
        }
      }
    ]
  }
]
