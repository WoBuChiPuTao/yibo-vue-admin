import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const home: AddRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: Layout,
  redirect: '/home/homepage',
  meta: {
    title: '系统'
  },
  children: [
    {
      path: 'homepage',
      name: 'HomePage',
      props: true,
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '主页'
      }
    }
  ]
}

export default home
