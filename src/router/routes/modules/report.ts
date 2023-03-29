import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import mdiChartBoxOutline from '@iconify-icons/mdi/chart-box-outline'
const Layout = () => import('@/layout/index.vue')

const reports: AddRouteRecordRaw = {
  path: '/report',
  name: 'Report',
  component: Layout,
  redirect: '/report/page',
  meta: {
    title: t('routes.demo.report.moduleName'),
    orderNo: 5,
    icon: {
      name: 'mdi:chart-box-outline',
      entity: mdiChartBoxOutline
    }
  },
  children: [
    {
      path: 'page',
      name: 'ReportPage',
      component: () => import('@/views/modules/report/index.vue'),
      meta: {
        title: t('routes.demo.report.moduleName'),
        hideMenu: true
      }
    }
  ]
}

export default reports
