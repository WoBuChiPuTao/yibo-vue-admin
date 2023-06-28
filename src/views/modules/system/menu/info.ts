import { Menu } from '#/list'

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 120,
    align: 'left'
  },
  {
    prop: 'path',
    label: '路径',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'icon',
    label: '图案',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'orderNo',
    label: '权重',
    minWidth: 120,
    align: 'center'
  }
]

export const menus: Menu[] = [
  {
    icon: {
      name: 'material-symbols:home-outline'
    },
    orderNo: 1,
    meta: {
      title: 'routes.home.home',
      icon: {
        name: 'material-symbols:home-outline'
      },
      orderNo: 1
    },
    name: 'routes.home.home',
    path: '/home',
    children: [
      {
        meta: {
          title: 'routes.home.dashboard',
          fixedTab: true
        },
        name: 'routes.home.dashboard',
        path: '/home/dashboard'
      },
      {
        meta: {
          title: 'routes.home.workbench'
        },
        name: 'routes.home.workbench',
        path: '/home/workbench'
      }
    ]
  },
  {
    orderNo: 5,
    icon: {
      name: 'mdi:chart-box-outline'
    },
    meta: {
      title: 'routes.demo.report.moduleName',
      orderNo: 5,
      icon: {
        name: 'mdi:chart-box-outline'
      }
    },
    name: 'routes.demo.report.moduleName',
    path: '/report/page',
    children: []
  },
  {
    orderNo: 10,
    icon: {
      name: 'ic:baseline-play-circle-outline'
    },
    meta: {
      orderNo: 10,
      icon: {
        name: 'ic:baseline-play-circle-outline'
      },
      title: 'routes.demo.feat.feat'
    },
    name: 'routes.demo.feat.feat',
    path: '/feat',
    children: [
      {
        meta: {
          title: 'routes.demo.feat.ws'
        },
        name: 'routes.demo.feat.ws',
        path: '/feat/ws'
      },
      {
        meta: {
          title: 'routes.demo.excel.excel'
        },
        name: 'routes.demo.excel.excel',
        path: '/feat/excel',
        children: [
          {
            meta: {
              title: 'routes.demo.excel.importExcel'
            },
            name: 'routes.demo.excel.importExcel',
            path: '/feat/excel/importExcel'
          },
          {
            meta: {
              title: 'routes.demo.excel.exportExcel'
            },
            name: 'routes.demo.excel.exportExcel',
            path: '/feat/excel/exportFile'
          }
        ]
      }
    ]
  },
  {
    orderNo: 30,
    icon: {
      name: 'ic:outline-design-services'
    },
    meta: {
      orderNo: 30,
      icon: {
        name: 'ic:outline-design-services'
      },
      title: 'routes.demo.graphics.moduleName'
    },
    name: 'routes.demo.graphics.moduleName',
    path: '/graphics',
    children: [
      {
        meta: {
          title: 'routes.demo.graphics.canvas'
        },
        name: 'routes.demo.graphics.canvas',
        path: '/graphics/canvas'
      }
    ]
  },
  {
    orderNo: 50,
    icon: {
      name: 'ion:layers-outline'
    },
    meta: {
      orderNo: 50,
      icon: {
        name: 'ion:layers-outline'
      },
      title: 'routes.demo.comp.comp'
    },
    name: 'routes.demo.comp.comp',
    path: '/comp',
    children: [
      {
        meta: {
          title: 'routes.demo.comp.basic'
        },
        name: 'routes.demo.comp.basic',
        path: '/comp/basic'
      },
      {
        meta: {
          title: 'routes.demo.comp.tree'
        },
        name: 'routes.demo.comp.tree',
        path: '/comp/tree',
        children: [
          {
            meta: {
              title: 'routes.demo.comp.treeBasic'
            },
            name: 'routes.demo.comp.treeBasic',
            path: '/comp/tree/basic'
          },
          {
            meta: {
              title: 'routes.demo.comp.editTree'
            },
            name: 'routes.demo.comp.editTree',
            path: '/comp/tree/editTree'
          },
          {
            meta: {
              title: 'routes.demo.comp.actionTree'
            },
            name: 'routes.demo.comp.actionTree',
            path: '/comp/tree/actionTree'
          }
        ]
      },
      {
        meta: {
          title: 'routes.demo.comp.lazy'
        },
        name: 'routes.demo.comp.lazy',
        path: '/comp/lazy'
      },
      {
        meta: {
          title: 'routes.demo.comp.qrcode'
        },
        name: 'routes.demo.comp.qrcode',
        path: '/comp/qrcode'
      },
      {
        meta: {
          title: 'routes.demo.comp.virtualTable'
        },
        name: 'routes.demo.comp.virtualTable',
        path: '/comp/vitual-table'
      }
    ]
  },
  {
    orderNo: 100,
    icon: {
      name: 'ion:stats-chart-outline'
    },
    meta: {
      orderNo: 100,
      icon: {
        name: 'ion:stats-chart-outline'
      },
      title: 'routes.demo.charts.charts'
    },
    name: 'routes.demo.charts.charts',
    path: '/charts',
    children: [
      {
        meta: {
          title: 'routes.demo.charts.aMap'
        },
        name: 'routes.demo.charts.aMap',
        path: '/charts/gaode'
      },
      {
        meta: {
          title: 'routes.demo.charts.echarts'
        },
        name: 'routes.demo.charts.echarts',
        path: '/charts/echarts',
        children: [
          {
            meta: {
              title: 'routes.demo.charts.map'
            },
            name: 'routes.demo.charts.map',
            path: '/charts/echarts/map'
          },
          {
            meta: {
              title: 'routes.demo.charts.line'
            },
            name: 'routes.demo.charts.line',
            path: '/charts/echarts/line'
          },
          {
            meta: {
              title: 'routes.demo.charts.pie'
            },
            name: 'routes.demo.charts.pie',
            path: '/charts/echarts/pie'
          }
        ]
      }
    ]
  },
  {
    icon: {
      name: 'ion:settings-outline'
    },
    orderNo: 1000,
    meta: {
      title: 'routes.demo.system.moduleName',
      icon: {
        name: 'ion:settings-outline'
      },
      orderNo: 1000
    },
    name: 'routes.demo.system.moduleName',
    path: '/system',
    children: [
      {
        meta: {
          title: 'routes.demo.system.account'
        },
        name: 'routes.demo.system.account',
        path: '/system/account'
      },
      {
        meta: {
          title: 'routes.demo.system.role'
        },
        name: 'routes.demo.system.role',
        path: '/system/role'
      },
      {
        meta: {
          title: 'routes.demo.system.menu'
        },
        name: 'routes.demo.system.menu',
        path: '/system/menu'
      },
      {
        meta: {
          title: 'routes.demo.system.dept'
        },
        name: 'routes.demo.system.dept',
        path: '/system/dept'
      },
      {
        meta: {
          title: 'routes.demo.system.password'
        },
        name: 'routes.demo.system.password',
        path: '/system/changePassword'
      }
    ]
  },
  {
    orderNo: 2000,
    icon: {
      name: 'ion:copy-outline'
    },
    meta: {
      title: 'routes.demo.capRisk.moduleName',
      orderNo: 2000,
      icon: {
        name: 'ion:copy-outline'
      }
    },
    name: 'routes.demo.capRisk.moduleName',
    path: '/caprisk',
    children: [
      {
        meta: {
          title: 'routes.demo.capRisk.bond'
        },
        name: 'routes.demo.capRisk.bond',
        path: '/caprisk/bond'
      }
    ]
  },
  {
    orderNo: 1000000,
    icon: {
      name: 'ion:ellipsis-vertical-circle'
    },
    meta: {
      title: 'routes.home.about',
      orderNo: 1000000,
      icon: {
        name: 'ion:ellipsis-vertical-circle'
      }
    },
    name: 'routes.home.about',
    path: '/about/page',
    children: []
  }
]
