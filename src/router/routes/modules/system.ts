import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/views/layout/index.vue')

const system: AddRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/account',
  meta: {
    title: t('routes.demo.system.moduleName'),
    icon: 'ion:settings-outline',
    orderNo: 2000
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        icon: 'ic:outline-account-circle'
      },
      component: () => import('@/views/modules/system/account/index.vue')
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role')
      },
      component: () => import('@/views/modules/system/role/index.vue')
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
        icon: 'ic:twotone-menu'
      },
      component: () => import('@/views/modules/system/menu/index.vue')
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept'),
        icon: 'mingcute:department-line'
      },
      component: () => import('@/views/modules/system/department/index.vue')
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.system.password'),
        icon: 'mdi:key-change'
      },
      component: () => import('@/views/modules/system/password/index.vue')
    }
  ]
}

export default system
