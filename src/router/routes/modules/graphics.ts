import { AddRouteRecordRaw } from '@/router/types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/layout/index.vue')

const graphics: AddRouteRecordRaw = {
  path: '/graphics',
  name: 'Graphics',
  component: Layout,
  redirect: '/graphics/canvas',
  meta: {
    orderNo: 30,
    icon: 'ic:outline-design-services',
    title: t('routes.demo.graphics.moduleName')
  },
  children: [
    {
      path: 'canvas',
      name: 'Canvas',
      component: () =>
        import(/* webpackChunkName: "Canvas" */ '@/views/modules/graphics/canvas/index.vue'),
      meta: {
        title: t('routes.demo.graphics.canvas')
      }
    }
  ]
}

export default graphics
