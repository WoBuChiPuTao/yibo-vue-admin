import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
const Layout = () => import('@/views/layout/index.vue')

const component: AddRouteRecordRaw = {
  path: '/comp',
  name: 'component',
  component: Layout,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.comp')
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('@/views/modules/component/basic/index.vue'),
      meta: {
        title: t('routes.demo.comp.basic'),
        icon: 'lucide:component'
      }
    },

    {
      path: 'tree',
      name: 'TreeDemo',
      redirect: '/comp/tree/basic',
      component: Layout,
      meta: {
        title: 'Tree',
        icon: 'clarity:tree-view-line'
      },
      children: [
        {
          path: 'basic',
          name: 'BasicTreeDemo',
          component: () => import('@/views/modules/component/tree/index.vue'),
          meta: {
            title: t('routes.demo.comp.treeBasic'),
            icon: 'ph:tree-structure-light'
          }
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () =>
            import('@/views/modules/component/tree/EditTree.vue'),
          meta: {
            title: t('routes.demo.comp.editTree'),
            icon: 'material-symbols:rebase-edit-outline-rounded'
          }
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () =>
            import('@/views/modules/component/tree/ActionTree.vue'),
          meta: {
            title: t('routes.demo.comp.actionTree'),
            icon: 'eos-icons:action-chains-outlined'
          }
        }
      ]
    }
  ]
}

export default component
