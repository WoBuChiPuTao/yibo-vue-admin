import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { Result } from '@/utils/axios/types'
import { LoginRes } from '#/api'
import { Menu } from '#/list'

const domain = '/api'

const superBack: Result<LoginRes> = {
  code: 200,
  message: 'success',
  data: {
    userId: 'admin',
    userName: 'yibo Admin',
    avatar: undefined,
    remarks: 'sb',
    alias: 'SB',
    token: '666666',
    roles: ['super', 'test']
    // roles: ['simple']
  }
}

const simpleBack: Result<LoginRes> = {
  code: 200,
  message: 'success',
  data: {
    userId: 'admin',
    userName: 'yibo Admin',
    avatar: undefined,
    remarks: 'sb',
    alias: 'SB',
    token: '666666',
    roles: ['simple']
  }
}

// 返回用户数据和token
Mock.mock(`${domain}/user/login`, 'post', (params) => {
  const queryString = params.body
  const queryObj = JSON.parse(queryString)
  if (queryObj.userName === 'admin' && queryObj.password === '123456') {
    return superBack
  } else if (queryObj.userName === 'test' && queryObj.password === '123456') {
    return simpleBack
  } else {
    return {
      code: 0,
      data: null,
      message: '账户或密码错误'
    }
  }
})

// 返回用户菜单列表
Mock.mock(`${domain}/user/menu`, 'post', ({ body }): Result<Menu[]> => {
  const { role } = JSON.parse(body) as { role: string }
  let data: Menu[] = []
  if (role === 'super') {
    data = superMenus
  } else if (role === 'simple') {
    data = simpleMenus
  }

  return {
    code: 200,
    message: 'success',
    data
  }
})

// 菜单数据
export const superMenus: Menu[] = [
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
        parentPath: '/home'
      }
    ]
  },
  {
    meta: {
      title: 'routes.demo.report.moduleName',
      orderNo: 5,
      icon: 'mdi:chart-box-outline'
    },
    name: 'routes.demo.report.moduleName',
    routeName: 'Report',
    path: '/report/page',
    icon: 'mdi:chart-box-outline',
    orderNo: 5,
    hideMenu: true,
    redirect: undefined,
    children: []
  },
  {
    meta: {
      orderNo: 10,
      icon: 'ic:baseline-play-circle-outline',
      title: 'routes.demo.feat.feat'
    },
    name: 'routes.demo.feat.feat',
    routeName: 'Feature',
    path: '/feat',
    icon: 'ic:baseline-play-circle-outline',
    orderNo: 10,
    hideMenu: false,
    redirect: '/feat/ws',
    children: [
      {
        meta: {
          title: 'routes.demo.feat.ws'
        },
        name: 'routes.demo.feat.ws',
        routeName: 'WebSocket',
        path: '/feat/ws',
        hideMenu: false,
        parentPath: '/feat'
      },
      {
        meta: {
          title: 'routes.demo.excel.excel'
        },
        name: 'routes.demo.excel.excel',
        routeName: 'Excel',
        path: '/feat/excel',
        hideMenu: false,
        redirect: '/feat/excel/importExcel',
        children: [
          {
            meta: {
              title: 'routes.demo.excel.importExcel'
            },
            name: 'routes.demo.excel.importExcel',
            routeName: 'ImportExcel',
            path: '/feat/excel/importExcel',
            hideMenu: false,
            parentPath: '/feat/excel'
          },
          {
            meta: {
              title: 'routes.demo.excel.exportExcel'
            },
            name: 'routes.demo.excel.exportExcel',
            routeName: 'ExportFile',
            path: '/feat/excel/exportFile',
            hideMenu: false,
            parentPath: '/feat/excel'
          }
        ],
        parentPath: '/feat'
      }
    ]
  },
  {
    meta: {
      orderNo: 30,
      icon: 'ic:outline-design-services',
      title: 'routes.demo.graphics.moduleName'
    },
    name: 'routes.demo.graphics.moduleName',
    routeName: 'Graphics',
    path: '/graphics',
    icon: 'ic:outline-design-services',
    orderNo: 30,
    hideMenu: false,
    redirect: '/graphics/canvas',
    children: [
      {
        meta: {
          title: 'routes.demo.graphics.canvas'
        },
        name: 'routes.demo.graphics.canvas',
        routeName: 'Canvas',
        path: '/graphics/canvas',
        hideMenu: false,
        parentPath: '/graphics'
      }
    ]
  },
  {
    meta: {
      orderNo: 50,
      icon: 'ion:layers-outline',
      title: 'routes.demo.comp.comp'
    },
    name: 'routes.demo.comp.comp',
    routeName: 'component',
    path: '/comp',
    icon: 'ion:layers-outline',
    orderNo: 50,
    hideMenu: false,
    redirect: '/comp/basic',
    children: [
      {
        meta: {
          title: 'routes.demo.comp.basic'
        },
        name: 'routes.demo.comp.basic',
        routeName: 'BasicDemo',
        path: '/comp/basic',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.tree'
        },
        name: 'routes.demo.comp.tree',
        routeName: 'TreeDemo',
        path: '/comp/tree',
        hideMenu: false,
        redirect: '/comp/tree/basic',
        children: [
          {
            meta: {
              title: 'routes.demo.comp.treeBasic'
            },
            name: 'routes.demo.comp.treeBasic',
            routeName: 'BasicTreeDemo',
            path: '/comp/tree/basic',
            hideMenu: false,
            parentPath: '/comp/tree'
          },
          {
            meta: {
              title: 'routes.demo.comp.editTree'
            },
            name: 'routes.demo.comp.editTree',
            routeName: 'EditTreeDemo',
            path: '/comp/tree/editTree',
            hideMenu: false,
            parentPath: '/comp/tree'
          },
          {
            meta: {
              title: 'routes.demo.comp.actionTree'
            },
            name: 'routes.demo.comp.actionTree',
            routeName: 'ActionTreeDemo',
            path: '/comp/tree/actionTree',
            hideMenu: false,
            parentPath: '/comp/tree'
          }
        ],
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.lazy'
        },
        name: 'routes.demo.comp.lazy',
        routeName: 'LazyDemo',
        path: '/comp/lazy',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.qrcode'
        },
        name: 'routes.demo.comp.qrcode',
        routeName: 'QRcode',
        path: '/comp/qrcode',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.virtualTable'
        },
        name: 'routes.demo.comp.virtualTable',
        routeName: 'VitualTable',
        path: '/comp/vitual-table',
        hideMenu: false,
        parentPath: '/comp'
      }
    ]
  },
  {
    meta: {
      orderNo: 100,
      icon: 'ion:stats-chart-outline',
      title: 'routes.demo.charts.charts'
    },
    name: 'routes.demo.charts.charts',
    routeName: 'Charts',
    path: '/charts',
    icon: 'ion:stats-chart-outline',
    orderNo: 100,
    hideMenu: false,
    redirect: '/charts/echarts/map',
    children: [
      {
        meta: {
          title: 'routes.demo.charts.aMap'
        },
        name: 'routes.demo.charts.aMap',
        routeName: 'GaoDe',
        path: '/charts/gaode',
        hideMenu: false,
        parentPath: '/charts'
      },
      {
        meta: {
          title: 'routes.demo.charts.echarts'
        },
        name: 'routes.demo.charts.echarts',
        routeName: 'Echarts',
        path: '/charts/echarts',
        hideMenu: false,
        redirect: '/charts/echarts/map',
        children: [
          {
            meta: {
              title: 'routes.demo.charts.map'
            },
            name: 'routes.demo.charts.map',
            routeName: 'Map',
            path: '/charts/echarts/map',
            hideMenu: false,
            parentPath: '/charts/echarts'
          },
          {
            meta: {
              title: 'routes.demo.charts.line'
            },
            name: 'routes.demo.charts.line',
            routeName: 'Line',
            path: '/charts/echarts/line',
            hideMenu: false,
            parentPath: '/charts/echarts'
          },
          {
            meta: {
              title: 'routes.demo.charts.pie'
            },
            name: 'routes.demo.charts.pie',
            routeName: 'Pie',
            path: '/charts/echarts/pie',
            hideMenu: false,
            parentPath: '/charts/echarts'
          }
        ],
        parentPath: '/charts'
      }
    ]
  },
  {
    meta: {
      title: 'routes.demo.system.moduleName',
      icon: 'ion:settings-outline',
      orderNo: 1000
    },
    name: 'routes.demo.system.moduleName',
    routeName: 'System',
    path: '/system',
    icon: 'ion:settings-outline',
    orderNo: 1000,
    hideMenu: false,
    redirect: '/system/account',
    children: [
      {
        meta: {
          title: 'routes.demo.system.account'
        },
        name: 'routes.demo.system.account',
        routeName: 'AccountManagement',
        path: '/system/account',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.role'
        },
        name: 'routes.demo.system.role',
        routeName: 'RoleManagement',
        path: '/system/role',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.menu'
        },
        name: 'routes.demo.system.menu',
        routeName: 'MenuManagement',
        path: '/system/menu',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.dept'
        },
        name: 'routes.demo.system.dept',
        routeName: 'DeptManagement',
        path: '/system/dept',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.password'
        },
        name: 'routes.demo.system.password',
        routeName: 'ChangePassword',
        path: '/system/changePassword',
        hideMenu: false,
        parentPath: '/system'
      }
    ]
  },
  {
    meta: {
      title: 'routes.demo.capRisk.moduleName',
      orderNo: 2000,
      icon: 'ion:copy-outline'
    },
    name: 'routes.demo.capRisk.moduleName',
    routeName: 'CapRisk',
    path: '/caprisk',
    icon: 'ion:copy-outline',
    orderNo: 2000,
    hideMenu: false,
    redirect: '/caprisk/onepage',
    children: [
      {
        meta: {
          title: 'routes.demo.capRisk.bond'
        },
        name: 'routes.demo.capRisk.bond',
        routeName: 'Bond',
        path: '/caprisk/bond',
        hideMenu: false,
        parentPath: '/caprisk',
        rights: [
          { buttonId: '111', buttonName: '新增' },
          { buttonId: '222', buttonName: '修改' },
          { buttonId: '333', buttonName: '删除' },
          { buttonId: '444', buttonName: '计算' },
          { buttonId: '66', buttonName: '导入' },
          { buttonId: '77', buttonName: '导出' },
          { buttonId: '88', buttonName: '查询' }
        ]
      }
    ]
  },
  {
    meta: {
      title: 'routes.home.about',
      orderNo: 1000000,
      icon: 'ion:ellipsis-vertical-circle'
    },
    name: 'routes.home.about',
    routeName: 'About',
    path: '/about/page',
    icon: 'ion:ellipsis-vertical-circle',
    orderNo: 1000000,
    hideMenu: false,
    redirect: undefined,
    children: []
  }
]

const simpleMenus: Menu[] = [
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
        parentPath: '/home'
      }
    ]
  }
]
