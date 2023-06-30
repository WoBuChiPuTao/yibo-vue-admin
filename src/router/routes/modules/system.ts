import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const system: AddRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/account',
  meta: {
    title: t('routes.demo.system.moduleName'),
    // icon: 'ion:settings-outline',
    icon: 'ion:settings-outline',
    orderNo: 1000
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account')
      },
      component: () =>
        import(
          /* webpackChunkName: "AccountManagement" */ '@/views/modules/system/account/index.vue'
        )
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role')
      },
      component: () =>
        import(/* webpackChunkName: "RoleManagement" */ '@/views/modules/system/role/index.vue')
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu')
      },
      component: () =>
        import(/* webpackChunkName: "MenuManagement" */ '@/views/modules/system/menu/index.vue')
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept')
      },
      component: () =>
        import(
          /* webpackChunkName: "DeptManagement" */ '@/views/modules/system/department/index.vue'
        )
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.system.password')
      },
      component: () =>
        import(/* webpackChunkName: "ChangePassword" */ '@/views/modules/system/password/index.vue')
    }
  ]
}

export default system
