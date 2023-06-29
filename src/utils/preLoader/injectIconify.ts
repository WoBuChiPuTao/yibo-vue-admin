// 导入离线的iconfiy图标
import { addIcon } from '@iconify/vue/dist/offline'

import baselineFacebook from '@iconify-icons/ic/baseline-facebook'
import googleLogoFill from '@iconify-icons/ph/google-logo-fill'
import Github from '@iconify-icons/mdi/github'
import baselineWechat from '@iconify-icons/ic/baseline-wechat'
import alipayFill from '@iconify-icons/ri/alipay-fill'

import ellipsisVerticalCircle from '@iconify-icons/ion/ellipsis-vertical-circle'
import copyOutline from '@iconify-icons/ion/copy-outline'
import statsChartOutline from '@iconify-icons/ion/stats-chart-outline'
import layersOutline from '@iconify-icons/ion/layers-outline'
import baselinePlayCircleOutline from '@iconify-icons/ic/baseline-play-circle-outline'
import IconEntity from '@iconify-icons/ic/outline-design-services'
import homeOutline from '@iconify-icons/material-symbols/home-outline'
import mdiChartBoxOutline from '@iconify-icons/mdi/chart-box-outline'
import settingsOutline from '@iconify-icons/ion/settings-outline'

export function importIconify() {
  addIcon('ic:baseline-facebook', baselineFacebook)
  addIcon('ph:google-logo-fill', googleLogoFill)
  addIcon('mdi:github', Github)
  addIcon('ic:baseline-wechat', baselineWechat)
  addIcon('ri:alipay-fill', alipayFill)
  addIcon('ion:ellipsis-vertical-circle', ellipsisVerticalCircle)
  addIcon('ion:copy-outline', copyOutline)
  addIcon('ion:stats-chart-outline', statsChartOutline)
  addIcon('ion:layers-outline', layersOutline)
  addIcon('ic:baseline-play-circle-outline', baselinePlayCircleOutline)
  addIcon('ic:outline-design-services', IconEntity)
  addIcon('material-symbols:home-outline', homeOutline)
  addIcon('mdi:chart-box-outline', mdiChartBoxOutline)
  addIcon('ion:settings-outline', settingsOutline)
}
