import { RoleInfo } from '#/store'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'roleId',
    label: t('module.system.roleId'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'roleName',
    label: t('module.system.roleName'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'state',
    label: t('module.system.roleStatus'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'createTime',
    label: t('module.system.createTime'),
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'remarks',
    label: t('module.system.remarks'),
    minWidth: 210,
    align: 'center'
  }
]

export const roleData: RoleInfo[] = [
  {
    roleId: '1111',
    roleName: '超级管理员',
    state: true,
    createTime: '1975-08-24 00:25:52',
    remarks: '大撒大撒大撒大大撒打算',
    menu: [
      {
        meta: {
          title: 'routes.home.home',
          icon: 'material-symbols:home-outline',
          orderNo: 1
        },
        name: 'routes.home.home',
        path: '/home',
        icon: 'material-symbols:home-outline',
        orderNo: 1,
        hideMenu: false,
        redirect: '/home/dashboard',
        children: [
          {
            meta: {
              title: 'routes.home.dashboard',
              fixedTab: true
            },
            name: 'routes.home.dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { buttonId: '111', buttonName: '新增' },
              { buttonId: '222', buttonName: '修改' },
              { buttonId: '333', buttonName: '删除' }
            ]
          }
        ]
      }
    ]
  },
  {
    roleId: '222',
    roleName: '测试',
    state: true,
    createTime: '1975-08-24 00:25:52',
    remarks: '厄尔热舞企鹅恶气恶气',
    menu: [
      {
        meta: {
          title: 'routes.home.home',
          icon: 'material-symbols:home-outline',
          orderNo: 1
        },
        name: 'routes.home.home',
        path: '/home',
        icon: 'material-symbols:home-outline',
        orderNo: 1,
        hideMenu: false,
        redirect: '/home/dashboard',
        children: [
          {
            meta: {
              title: 'routes.home.dashboard',
              fixedTab: true
            },
            name: 'routes.home.dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [{ buttonId: '777', buttonName: '查询' }]
          }
        ]
      }
    ]
  },
  {
    roleId: '333',
    roleName: '普通用户',
    state: true,
    createTime: '1975-08-24 00:25:52',
    remarks: '她依然有人依然有人提议',
    menu: [
      {
        meta: {
          title: 'routes.home.home',
          icon: 'material-symbols:home-outline',
          orderNo: 1
        },
        name: 'routes.home.home',
        path: '/home',
        icon: 'material-symbols:home-outline',
        orderNo: 1,
        hideMenu: false,
        redirect: '/home/dashboard',
        children: [
          {
            meta: {
              title: 'routes.home.dashboard',
              fixedTab: true
            },
            name: 'routes.home.dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { buttonId: '111', buttonName: '新增' },
              { buttonId: '222', buttonName: '修改' },
              { buttonId: '333', buttonName: '删除' }
            ]
          }
        ]
      }
    ]
  },
  {
    roleId: '444',
    roleName: '访客',
    state: true,
    createTime: '1975-08-24 00:25:52',
    remarks: '原图原图兔兔与图腾',
    menu: [
      {
        meta: {
          title: 'routes.home.home',
          icon: 'material-symbols:home-outline',
          orderNo: 1
        },
        name: 'routes.home.home',
        path: '/home',
        icon: 'material-symbols:home-outline',
        orderNo: 1,
        hideMenu: false,
        redirect: '/home/dashboard',
        children: [
          {
            meta: {
              title: 'routes.home.dashboard',
              fixedTab: true
            },
            name: 'routes.home.dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          }
        ]
      }
    ]
  }
]
