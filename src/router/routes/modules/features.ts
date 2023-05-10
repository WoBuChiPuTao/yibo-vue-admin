import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import baselinePlayCircleOutline from '@iconify-icons/ic/baseline-play-circle-outline'
const Layout = () => import('@/layout/index.vue')

const features: AddRouteRecordRaw = {
  path: '/feat',
  name: 'Feature',
  component: Layout,
  redirect: '/feat/ws',
  meta: {
    orderNo: 10,
    icon: {
      name: 'ic:baseline-play-circle-outline',
      entity: baselinePlayCircleOutline
    },
    title: t('routes.demo.feat.feat')
  },
  children: [
    {
      path: 'ws',
      name: 'WebSocket',
      component: () =>
        import(/* webpackChunkName: "WebSocket" */ '@/views/modules/feature/webSocket/index.vue'),
      meta: {
        title: t('routes.demo.feat.ws')
      }
    },
    {
      path: 'excel',
      name: 'Excel',
      redirect: '/feat/excel/importExcel',
      component: Layout,
      meta: {
        title: t('routes.demo.excel.excel')
      },
      children: [
        {
          path: 'importExcel',
          name: 'ImportExcel',
          component: () =>
            import(
              /* webpackChunkName: "ImportExcel" */ '@/views/modules/feature/excel/ImportExcel.vue'
            ),
          meta: {
            title: t('routes.demo.excel.importExcel')
          }
        },
        {
          path: 'exportFile',
          name: 'ExportFile',
          component: () =>
            import(
              /* webpackChunkName: "ExportFile" */ '@/views/modules/feature/excel/ExportExcel.vue'
            ),
          meta: {
            title: t('routes.demo.excel.exportExcel')
          }
        }
      ]
    }
  ]
}

export default features
