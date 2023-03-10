import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const about: AddRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/page',
  meta: {
    title: t('routes.dashboard.about'),
    orderNo: 100000,
    icon: 'simple-icons:aboutdotme'
  },
  children: [
    {
      path: 'page',
      name: 'AboutPage',
      component: () => import('@/views/modules/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:aboutdotme',
        hideMenu: true
      }
    }
  ]
}

export default about
