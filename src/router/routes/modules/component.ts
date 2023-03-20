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
    orderNo: 30,
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
      component: () => import('@/views/modules/component/basic/index.vue'),
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
          component: () => import('@/views/modules/component/tree/index.vue'),
          meta: {
            title: t('routes.demo.comp.treeBasic')
          }
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () => import('@/views/modules/component/tree/EditTree.vue'),
          meta: {
            title: t('routes.demo.comp.editTree')
          }
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () => import('@/views/modules/component/tree/ActionTree.vue'),
          meta: {
            title: t('routes.demo.comp.actionTree')
          }
        }
      ]
    }
  ]
}

export default component
