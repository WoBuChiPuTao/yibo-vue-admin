import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import route from './routes/index'
import type { App } from 'vue'

// router配置
export const router = createRouter({
  history: createWebHashHistory(),
  routes: route as unknown as RouteRecordRaw[]
})

// 创建router实例方法
export function setupRouter(app: App<Element>) {
  app.use(router)
}
