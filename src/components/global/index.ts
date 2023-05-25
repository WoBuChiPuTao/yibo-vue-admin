import { App } from 'vue'
import BasicContainer from '../container/BasicContainer.vue'
import { ElButton } from 'element-plus'

export function setupComponents(app: App) {
  app.component('BasicContainer', BasicContainer)
  app.component('ElButton', ElButton)
}
