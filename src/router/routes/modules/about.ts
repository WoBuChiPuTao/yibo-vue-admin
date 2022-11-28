import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const about: AddRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/page',
  meta: {
    title: '关于'
  },
  children: [
    {
      path: 'page',
      name: 'AboutPage',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'ion:bar-chart-outline'
      }
    }
  ]
}

export default about
