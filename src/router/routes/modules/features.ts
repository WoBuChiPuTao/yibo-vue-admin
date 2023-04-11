import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import ionLogoXbox from '@iconify-icons/ion/logo-xbox'
const Layout = () => import('@/layout/index.vue')

const features: AddRouteRecordRaw = {
  path: '/feat',
  name: 'Feature',
  component: Layout,
  redirect: '/feat/ws',
  meta: {
    orderNo: 10,
    icon: {
      name: 'ion:logo-xbox',
      entity: ionLogoXbox
    },
    title: t('routes.demo.feat.feat')
  },
  children: [
    {
      path: 'ws',
      name: 'WebSocket',
      component: () => import('@/views/modules/feature/webSocket/index.vue'),
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
          component: () => import('@/views/modules/feature/excel/ImportExcel.vue'),
          meta: {
            title: t('routes.demo.excel.importExcel')
          }
        },
        {
          path: 'exportFile',
          name: 'ExportFile',
          component: () => import('@/views/modules/feature/excel/ExportExcel.vue'),
          meta: {
            title: t('routes.demo.excel.exportExcel')
          }
        }
      ]
    }
  ]
}

export default features
