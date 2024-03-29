import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const home: AddRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: Layout,
  redirect: '/home/dashboard',
  meta: {
    title: t('routes.home.home'),
    icon: 'material-symbols:home-outline',
    orderNo: 1
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () =>
        import(/* webpackChunkName: "Dashboard" */ '@/views/home/dashboard/index.vue'),
      meta: {
        title: t('routes.home.dashboard'),
        fixedTab: true
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () =>
        import(/* webpackChunkName: "Workbench" */ '@/views/home/workbench/index.vue'),
      meta: {
        title: t('routes.home.workbench')
      }
    }
  ]
}

export default home
