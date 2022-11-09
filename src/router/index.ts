import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import route from './routes/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes: route as unknown as RouteRecordRaw[]
})

export default router
