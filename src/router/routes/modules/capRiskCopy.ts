import { AddRouteRecordRaw } from '../../types'
import { t } from '@/hooks/web/useI18n'
import copyOutline from '@iconify-icons/ion/copy-outline'
const Layout = () => import('@/layout/index.vue')

const capRisk: AddRouteRecordRaw = {
  path: '/caprisk',
  name: 'CapRisk',
  component: Layout,
  redirect: '/caprisk/onepage',
  meta: {
    title: t('routes.demo.capRisk.moduleName'),
    orderNo: 2000,
    icon: {
      name: 'ion:copy-outline',
      entity: copyOutline
    }
  },
  children: [
    {
      path: 'bond',
      name: 'Bond',
      component: () =>
        import(/* webpackChunkName: "CapRisk-bond" */ '@/views/modules/caprisk/bond/index.vue'),
      meta: {
        title: t('routes.demo.capRisk.bond')
      }
    }
  ]
}

export default capRisk
