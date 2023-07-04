import { Menu } from '#/list'

export interface RoleInfo {
  code: string
  name: string
  state: boolean
  createTime: string
  remarks?: string
  menu: Menu[]
}

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'code',
    label: '角色ID',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'name',
    label: '角色名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'state',
    label: '角色状态',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: 210,
    align: 'center'
  }
]

export const roleData: RoleInfo[] = [
  {
    code: '1111',
    name: '超级管理员',
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
        routeName: 'home',
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
            routeName: 'Dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            routeName: 'Workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { id: '111', name: '新增' },
              { id: '222', name: '修改' },
              { id: '333', name: '删除' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: '222',
    name: '测试',
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
        routeName: 'home',
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
            routeName: 'Dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            routeName: 'Workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { id: '111', name: '新增' },
              { id: '222', name: '修改' },
              { id: '333', name: '删除' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: '333',
    name: '普通用户',
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
        routeName: 'home',
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
            routeName: 'Dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            routeName: 'Workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { id: '111', name: '新增' },
              { id: '222', name: '修改' },
              { id: '333', name: '删除' }
            ]
          }
        ]
      }
    ]
  },
  {
    code: '444',
    name: '访客',
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
        routeName: 'home',
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
            routeName: 'Dashboard',
            path: '/home/dashboard',
            hideMenu: false,
            parentPath: '/home'
          },
          {
            meta: {
              title: 'routes.home.workbench'
            },
            name: 'routes.home.workbench',
            routeName: 'Workbench',
            path: '/home/workbench',
            hideMenu: false,
            parentPath: '/home',
            rights: [
              { id: '111', name: '新增' },
              { id: '222', name: '修改' },
              { id: '333', name: '删除' }
            ]
          }
        ]
      }
    ]
  }
]
