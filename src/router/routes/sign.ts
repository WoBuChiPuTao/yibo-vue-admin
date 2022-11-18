import { AddRouteRecordRaw } from '../types'

const sign: Array<AddRouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/RegisterForm.vue'),
    meta: {
      title: '注册'
    }
  }
]

export default sign
