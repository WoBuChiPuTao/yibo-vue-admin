// element-plus样式引入
import 'element-plus/dist/index.css'
// tailwindcss样式引入
import 'tailwindcss/tailwind.css'
// 引入与element样式冲突的文件
import './style/tailwindcss/preflight.css'
// 引入element主题样式文件
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入基本样式
import './style/index.less'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import { setupI18n } from './locales/setupI18n'
import { initConfigStore } from './settings/init'
import { setupDirectives } from './directives'
import { preLoader } from './utils/preLoader'
import { setupComponents } from './components/global'

async function launch() {
  // 注入svg和公用图片
  preLoader()
  // 创建app实例
  const app = createApp(App)
  // 创建仓库
  setupStore(app)
  // 初始化配置
  initConfigStore()
  // 配置语言异步
  await setupI18n(app)
  // 创建router实例
  setupRouter(app)
  // 创建路由守卫
  setupRouterGuard(router)
  // 注册全局组件
  setupComponents(app)
  // 创建全局指令
  setupDirectives(app)

  app.mount('#app')
}

launch()
