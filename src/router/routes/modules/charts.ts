import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const charts: AddRouteRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: Layout,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: '图表'
  },
  children: [
    {
      path: 'echarts',
      name: 'Echarts',
      component: Layout,
      meta: {
        title: 'Echarts'
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/views/modules/charts/echart/Map.vue'),
          meta: {
            title: '地图'
          }
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('@/views/modules/charts/echart/Line.vue'),
          meta: {
            title: '折线图'
          }
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('@/views/modules/charts/echart/Pie.vue'),
          meta: {
            title: '饼图'
          }
        }
      ]
    }
  ]
}

export default charts
