import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const about: AddRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/page',
  meta: {
    title: '关于',
    orderNo: 100000,
    icon: 'simple-icons:aboutdotme'
  },
  children: [
    {
      path: 'page',
      name: 'AboutPage',
      component: () => import('@/views/modules/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'simple-icons:aboutdotme',
        hideMenu: true
      }
    }
  ]
}

export default about
