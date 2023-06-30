import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'

const Layout = () => import('@/layout/index.vue')

const about: AddRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/page',
  meta: {
    title: t('routes.home.about'),
    orderNo: 1000000,
    icon: 'ion:ellipsis-vertical-circle'
  },
  children: [
    {
      path: 'page',
      name: 'AboutPage',
      component: () =>
        import(/* webpackChunkName: "AboutPage" */ '@/views/modules/about/index.vue'),
      meta: {
        title: t('routes.home.about'),
        hideMenu: true
      }
    }
  ]
}

export default about
