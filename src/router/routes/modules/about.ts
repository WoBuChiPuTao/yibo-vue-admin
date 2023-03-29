import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import ellipsisVerticalCircle from '@iconify-icons/ion/ellipsis-vertical-circle'
const Layout = () => import('@/layout/index.vue')

const about: AddRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/page',
  meta: {
    title: t('routes.home.about'),
    orderNo: 1000000,
    icon: {
      name: 'ion:ellipsis-vertical-circle',
      entity: ellipsisVerticalCircle
    }
  },
  children: [
    {
      path: 'page',
      name: 'AboutPage',
      component: () => import('@/views/modules/about/index.vue'),
      meta: {
        title: t('routes.home.about'),
        hideMenu: true
      }
    }
  ]
}

export default about
