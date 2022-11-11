import { AddRouteRecordRaw } from '../types'

const layout: Array<AddRouteRecordRaw> = [
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/LayoutView.vue'),
    meta: {
      title: '主页'
    }
  }
]

export default layout
