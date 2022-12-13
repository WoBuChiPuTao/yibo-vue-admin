import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const home: AddRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: Layout,
  redirect: '/home/homepage',
  meta: {
    title: '主页',
    icon: 'material-symbols:home-outline',
    orderNo: 10
  },
  children: [
    {
      path: 'homepage',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '主页',
        icon: 'material-symbols:home-outline',
        hidden: true
      }
    }
  ]
}

export default home
