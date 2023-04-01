import { App } from 'vue'
import { ElLoadingDirective } from 'element-plus'

// 配置全局指令
export function setupDirectives(app: App) {
  app.directive('loading', ElLoadingDirective)
}
