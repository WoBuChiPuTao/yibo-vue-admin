import { AddRouteRecordRaw } from '../types'

const login: Array<AddRouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: '登录'
    }
  }
]

export default login
