import homeOutline from '@iconify-icons/material-symbols/home-outline'
import ionLogoXbox from '@iconify-icons/ion/logo-xbox'
import ellipsisVerticalCircle from '@iconify-icons/ion/ellipsis-vertical-circle'
import ionKSettingsOutline from '@iconify-icons/ion/settings-outline'
import ionlayersOutline from '@iconify-icons/ion/layers-outline'
import barChartOutline from '@iconify-icons/ion/bar-chart-outline'
import { AccessItem } from './components/types'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const accessItems: AccessItem[] = [
  {
    name: '111',
    title: t('routes.home.home'),
    icon: 'material-symbols:home-outline',
    postIcon: homeOutline,
    color: '#ff0000'
  },
  {
    name: '2',
    title: t('routes.demo.feat.feat'),
    icon: 'ion:logo-xbox',
    postIcon: ionLogoXbox,
    color: '#ffae00'
  },
  {
    name: '3',
    title: t('routes.demo.comp.comp'),
    icon: 'ion:layers-outline',
    postIcon: ionlayersOutline,
    color: '#eeff00'
  },
  {
    name: '14',
    title: t('routes.demo.charts.charts'),
    icon: 'ion:bar-chart-outline',
    postIcon: barChartOutline,
    color: '#51ff00'
  },
  {
    name: '5',
    title: t('routes.demo.system.moduleName'),
    icon: 'ion:settings-outline',
    postIcon: ionKSettingsOutline,
    color: '#00ffdd'
  },
  {
    name: '6',
    title: t('routes.home.about'),
    icon: 'ion:ellipsis-vertical-circle',
    postIcon: ellipsisVerticalCircle,
    color: '#d400ff'
  }
]
