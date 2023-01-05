import { AddRouteRecordRaw } from '../../types'
const Layout = () => import('@/views/layout/index.vue')

const component: AddRouteRecordRaw = {
  path: '/comp',
  name: 'component',
  component: Layout,
  redirect: '/comp/basic',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: '组件'
  },

  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('@/views/modules/component/basic/index.vue'),
      meta: {
        title: '基础组件',
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
            title: '基础树',
            icon: 'ph:tree-structure-light'
          }
        },
        {
          path: 'editTree',
          name: 'EditTreeDemo',
          component: () =>
            import('@/views/modules/component/tree/EditTree.vue'),
          meta: {
            title: '可搜索/工具栏',
            icon: 'material-symbols:rebase-edit-outline-rounded'
          }
        },
        {
          path: 'actionTree',
          name: 'ActionTreeDemo',
          component: () =>
            import('@/views/modules/component/tree/ActionTree.vue'),
          meta: {
            title: '树操作示例',
            icon: 'eos-icons:action-chains-outlined'
          }
        }
      ]
    }
  ]
}

export default component
