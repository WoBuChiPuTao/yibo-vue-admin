import { AddRouteRecordRaw } from '../types'

const layout: Array<AddRouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/layout/LayoutView.vue'),
    meta: {
      title: '系统布局'
    },
    children: [
      {
        path: '/home/:id/:username',
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

export default layout
