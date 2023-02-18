import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'

const Layout = () => import('@/views/layout/index.vue')

const charts: AddRouteRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: Layout,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: t('routes.demo.charts.charts')
  },
  children: [
    {
      path: 'gaode',
      name: 'GaoDe',
      component: () => import('@/views/modules/charts/GaoDe/index.vue'),
      meta: {
        title: t('routes.demo.charts.aMap')
      }
    },
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
            title: t('routes.demo.charts.map')
          }
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('@/views/modules/charts/echart/Line.vue'),
          meta: {
            title: t('routes.demo.charts.line')
          }
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () => import('@/views/modules/charts/echart/Pie.vue'),
          meta: {
            title: t('routes.demo.charts.pie')
          }
        }
      ]
    }
  ]
}

export default charts
