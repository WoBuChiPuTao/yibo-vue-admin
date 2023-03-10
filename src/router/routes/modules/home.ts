import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const home: AddRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: Layout,
  redirect: '/home/homepage',
  meta: {
    title: t('routes.dashboard.homePage'),
    icon: 'material-symbols:home-outline',
    orderNo: 1
  },
  children: [
    {
      path: 'homepage',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: t('routes.dashboard.homePage'),
        hideMenu: true,
        fixedTab: true
      }
    }
  ]
}

export default home
