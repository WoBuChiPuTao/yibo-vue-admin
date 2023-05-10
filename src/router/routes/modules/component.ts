import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import layersOutline from '@iconify-icons/ion/layers-outline'
const Layout = () => import('@/layout/index.vue')

const component: AddRouteRecordRaw = {
  path: '/comp',
  name: 'component',
  component: Layout,
  redirect: '/comp/basic',
  meta: {
    orderNo: 50,
    icon: {
      name: 'ion:layers-outline',
      entity: layersOutline
    },
    title: t('routes.demo.comp.comp')
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () =>
        import(/* webpackChunkName: "BasicDemo" */ '@/views/modules/component/basic/index.vue'),
      meta: {
        title: t('routes.demo.comp.basic')
      }
    },
    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      component: Layout,
      meta: {
        title: t('routes.demo.comp.tree')
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () =>
            import(
              /* webpackChunkName: "BasicTreeDemo" */ '@/views/modules/component/tree/index.vue'
            ),
          meta: {
            title: t('routes.demo.comp.treeBasic')
          }
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () =>
            import(
              /* webpackChunkName: "EditTreeDemo" */ '@/views/modules/component/tree/EditTree.vue'
            ),
          meta: {
            title: t('routes.demo.comp.editTree')
          }
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () =>
            import(
              /* webpackChunkName: "ActionTreeDemo" */ '@/views/modules/component/tree/ActionTree.vue'
            ),
          meta: {
            title: t('routes.demo.comp.actionTree')
          }
        }
      ]
    },
    {
      path: 'lazy',
      name: 'LazyDemo',
      component: () =>
        import(/* webpackChunkName: "LazyDemo" */ '@/views/modules/component/lazy/index.vue'),
      meta: {
        title: t('routes.demo.comp.lazy')
      }
    },
    {
      path: 'qrcode',
      name: 'QRcode',
      component: () =>
        import(/* webpackChunkName: "QRcode" */ '@/views/modules/component/qrCode/index.vue'),
      meta: {
        title: t('routes.demo.comp.qrcode')
      }
    },
    {
      path: 'vitual-table',
      name: 'VitualTable',
      component: () =>
        import(
          /* webpackChunkName: "VitualTable" */ '@/views/modules/component/vitualTable/index.vue'
        ),
      meta: {
        title: t('routes.demo.comp.virtualTable')
      }
    }
  ]
}

export default component
