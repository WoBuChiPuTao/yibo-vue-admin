import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router, setupRouter } from './router'
import { setupRouteGuard } from './router/guard'
import { setupStore } from './store'
import 'element-plus/dist/index.css'
import './style/index.less'
import { setupI18n } from './locales/setupI18n'

async function launch() {
  // 创建app实例
  const app = createApp(App)
  // 创建仓库
  setupStore(app)
  // 配置语言异步
  await setupI18n(app)
  // 创建router实例
  setupRouter(app)
  // 创建路由守卫
  setupRouteGuard(router)

  app.mount('#app')
}

launch()
