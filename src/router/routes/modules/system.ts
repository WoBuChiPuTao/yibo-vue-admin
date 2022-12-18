import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const system: AddRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/account',
  meta: {
    title: '系统管理',
    icon: 'ion:settings-outline',
    orderNo: 2000
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: '账号管理',
        icon: 'ic:outline-account-circle'
      },
      component: () => import('@/views/modules/system/account/index.vue')
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: '菜单管理',
        icon: 'ic:twotone-menu'
      },
      component: () => import('@/views/modules/system/menu/index.vue')
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: '部门管理',
        icon: 'mingcute:department-line'
      },
      component: () => import('@/views/modules/system/department/index.vue')
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: '修改密码',
        icon: 'mdi:key-change'
      },
      component: () => import('@/views/modules/system/password/index.vue')
    }
  ]
}

export default system
