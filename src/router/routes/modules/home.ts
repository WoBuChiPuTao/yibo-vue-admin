import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import homeOutline from '@iconify-icons/material-symbols/home-outline'
const Layout = () => import('@/layout/index.vue')

const home: AddRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: Layout,
  redirect: '/home/dashboard',
  meta: {
    title: t('routes.home.home'),
    icon: {
      name: 'material-symbols:home-outline',
      entity: homeOutline
    },
    orderNo: 1
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        title: t('routes.home.dashboard'),
        fixedTab: true
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/home/workbench/index.vue'),
      meta: {
        title: t('routes.home.workbench')
      }
    }
  ]
}

export default home
