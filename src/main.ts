import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router, setupRouter } from './router'
import { setupRouteGuard } from './router/guard'
import { setupStore } from './store'
import 'element-plus/dist/index.css'
import './style/whole.less'

// 创建app实例
const app = createApp(App)
// 创建router实例
setupRouter(app)
// 创建路由守卫
setupRouteGuard(router)
// 创建仓库
setupStore(app)

app.mount('#app')
