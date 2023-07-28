import Mock from 'mockjs' // 引入mockjs
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
    token: '666666',
    roles: ['super', 'test']
    // roles: ['simple']
  }
}

const simpleBack: Result<LoginRes> = {
  code: 200,
  message: 'success',
  data: {
    userId: 'test',
    userName: 'Test User',
    avatar: undefined,
    remarks: 'sb',
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
    path: '/home',
    icon: 'material-symbols:home-outline',
    orderNo: 1,
    hideMenu: false,
    redirect: '/home/dashboard',
    children: [
      {
        meta: {
          title: 'routes.home.dashboard'
        },
        fixedTab: true,
        name: 'routes.home.dashboard',
        path: '/home/dashboard',
        hideMenu: false,
        parentPath: '/home'
      },
      {
        meta: {
          title: 'routes.home.workbench'
        },
        fixedTab: true,
        name: 'routes.home.workbench',
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
    path: '/report/page',
    icon: 'mdi:chart-box-outline',
    orderNo: 5,
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
        path: '/feat/ws',
        hideMenu: false,
        parentPath: '/feat'
      },
      {
        meta: {
          title: 'routes.demo.excel.excel'
        },
        name: 'routes.demo.excel.excel',
        path: '/feat/excel',
        hideMenu: false,
        redirect: '/feat/excel/importExcel',
        children: [
          {
            meta: {
              title: 'routes.demo.excel.importExcel'
            },
            name: 'routes.demo.excel.importExcel',
            path: '/feat/excel/importExcel',
            hideMenu: false,
            parentPath: '/feat/excel'
          },
          {
            meta: {
              title: 'routes.demo.excel.exportExcel'
            },
            name: 'routes.demo.excel.exportExcel',
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
        path: '/comp/basic',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.tree'
        },
        name: 'routes.demo.comp.tree',
        path: '/comp/tree',
        hideMenu: false,
        redirect: '/comp/tree/basic',
        children: [
          {
            meta: {
              title: 'routes.demo.comp.treeBasic'
            },
            name: 'routes.demo.comp.treeBasic',
            path: '/comp/tree/basic',
            hideMenu: false,
            parentPath: '/comp/tree'
          },
          {
            meta: {
              title: 'routes.demo.comp.editTree'
            },
            name: 'routes.demo.comp.editTree',
            path: '/comp/tree/editTree',
            hideMenu: false,
            parentPath: '/comp/tree'
          },
          {
            meta: {
              title: 'routes.demo.comp.actionTree'
            },
            name: 'routes.demo.comp.actionTree',
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
        path: '/comp/lazy',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.qrcode'
        },
        name: 'routes.demo.comp.qrcode',
        path: '/comp/qrcode',
        hideMenu: false,
        parentPath: '/comp'
      },
      {
        meta: {
          title: 'routes.demo.comp.virtualTable'
        },
        name: 'routes.demo.comp.virtualTable',
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
        path: '/charts/gaode',
        hideMenu: false,
        parentPath: '/charts'
      },
      {
        meta: {
          title: 'routes.demo.charts.echarts'
        },
        name: 'routes.demo.charts.echarts',
        path: '/charts/echarts',
        hideMenu: false,
        redirect: '/charts/echarts/map',
        children: [
          {
            meta: {
              title: 'routes.demo.charts.map'
            },
            name: 'routes.demo.charts.map',
            path: '/charts/echarts/map',
            hideMenu: false,
            parentPath: '/charts/echarts'
          },
          {
            meta: {
              title: 'routes.demo.charts.line'
            },
            name: 'routes.demo.charts.line',
            path: '/charts/echarts/line',
            hideMenu: false,
            parentPath: '/charts/echarts'
          },
          {
            meta: {
              title: 'routes.demo.charts.pie'
            },
            name: 'routes.demo.charts.pie',
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
        path: '/system/account',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.role'
        },
        name: 'routes.demo.system.role',
        path: '/system/role',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.menu'
        },
        name: 'routes.demo.system.menu',
        path: '/system/menu',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.dept'
        },
        name: 'routes.demo.system.dept',
        path: '/system/dept',
        hideMenu: false,
        parentPath: '/system'
      },
      {
        meta: {
          title: 'routes.demo.system.password'
        },
        name: 'routes.demo.system.password',
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
        path: '/caprisk/bond',
        hideMenu: false,
        parentPath: '/caprisk',
        rights: [
          { buttonId: '111', buttonName: '新增' },
          { buttonId: '222', buttonName: '修改' },
          { buttonId: '333', buttonName: '删除' },
          { buttonId: '444', buttonName: '计算' },
          { buttonId: '555', buttonName: '导入' },
          { buttonId: '666', buttonName: '导出' },
          { buttonId: '777', buttonName: '查询' }
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
    path: '/home',
    icon: 'material-symbols:home-outline',
    orderNo: 1,
    hideMenu: false,
    redirect: '/home/dashboard',
    children: [
      {
        meta: {
          title: 'routes.home.dashboard'
        },
        fixedTab: true,
        name: 'routes.home.dashboard',
        path: '/home/dashboard',
        hideMenu: false,
        parentPath: '/home'
      },
      {
        meta: {
          title: 'routes.home.workbench'
        },
        fixedTab: true,
        name: 'routes.home.workbench',
        path: '/home/workbench',
        hideMenu: false,
        parentPath: '/home'
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
        path: '/caprisk/bond',
        hideMenu: false,
        parentPath: '/caprisk',
        rights: [{ buttonId: '777', buttonName: '查询' }]
      }
    ]
  }
]
