import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const charts: AddRouteRecordRaw = {
  path: '/charts',
  name: 'Charts',
  component: Layout,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 100,
    icon: {
      name: 'ion:stats-chart-outline'
    },
    title: t('routes.demo.charts.charts')
  },
  children: [
    {
      path: 'gaode',
      name: 'GaoDe',
      component: () =>
        import(/* webpackChunkName: "GaoDe" */ '@/views/modules/charts/GaoDe/index.vue'),
      meta: {
        title: t('routes.demo.charts.aMap')
      }
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: Layout,
      meta: {
        title: t('routes.demo.charts.echarts')
      },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () =>
            import(/* webpackChunkName: "Map" */ '@/views/modules/charts/echart/Map.vue'),
          meta: {
            title: t('routes.demo.charts.map')
          }
        },
        {
          path: 'line',
          name: 'Line',
          component: () =>
            import(/* webpackChunkName: "Line" */ '@/views/modules/charts/echart/Line.vue'),
          meta: {
            title: t('routes.demo.charts.line')
          }
        },
        {
          path: 'pie',
          name: 'Pie',
          component: () =>
            import(/* webpackChunkName: "Pie" */ '@/views/modules/charts/echart/Pie.vue'),
          meta: {
            title: t('routes.demo.charts.pie')
          }
        }
      ]
    }
  ]
}

export default charts
