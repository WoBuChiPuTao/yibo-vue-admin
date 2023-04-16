import { AddRouteRecordRaw } from '@/router/types'
import { t } from '@/hooks/web/useI18n'
import IconEntity from '@iconify-icons/ic/outline-design-services'
const Layout = () => import('@/layout/index.vue')

const graphics: AddRouteRecordRaw = {
  path: '/graphics',
  name: 'Graphics',
  component: Layout,
  redirect: '/graphics/canvas',
  meta: {
    orderNo: 30,
    icon: {
      name: 'ic:outline-design-services',
      entity: IconEntity
    },
    title: t('routes.demo.graphics.moduleName')
  },
  children: [
    {
      path: 'canvas',
      name: 'Canvas',
      component: () => import('@/views/modules/graphics/canvas/index.vue'),
      meta: {
        title: t('routes.demo.graphics.canvas')
      }
    }
  ]
}

export default graphics
