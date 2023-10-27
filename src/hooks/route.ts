import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordNormalized,
  RouteRecordRaw
} from 'vue-router'
import { cloneDeep, omit } from 'lodash-es'

// 判断路由级别是否超过2级
function isMultipleRoute<T extends RouteRecordRaw>(route: T) {
  // Reflect.has 与 in 操作符 相同, 用于检查一个对象(包括它原型链上)是否拥有某个属性
  if (!route || !Reflect.has(route, 'children') || !route.children?.length) {
    return false
  }
  const children = route.children
  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 路由等级提升
function promoteRouteLevel<T extends RouteRecordRaw>(route: T) {
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router: Router | null = createRouter({
    routes: [route as unknown as RouteRecordNormalized],
    history: createWebHashHistory()
  })
  // getRoutes： 获取所有路由记录的完整列表。
  const routes = router.getRoutes()
  // 将所有子路由添加到二级路由
  addToChildren(routes, route.children || [], route)
  router = null

  // omit lodash的函数 对传入的item对象的children进行删除
  // 剔除三级路由
  route.children = route.children?.map((item) => omit(item, 'children') as RouteRecordNormalized)
}

// 将所有子路由添加到二级路由
function addToChildren<T extends RouteRecordRaw>(
  routes: RouteRecordNormalized[],
  children: T[],
  routeModule: T
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]

    const route = routes.find((item) => item.name === child.name)
    // 判断路由是否存在
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    // 判断chilren是否是2级
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children.push(route as unknown as T)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

/**
 *  @description: 将多级路由转换为 2 级路由
 */
export function flatMultiRoutes<T extends RouteRecordRaw>(routes: T[]) {
  // 深拷贝
  const modules: T[] = cloneDeep(routes)
  for (let i = 0; i < modules.length; i++) {
    const route = modules[i]
    if (!isMultipleRoute(route)) {
      continue
    }
    promoteRouteLevel(route)
  }
  return modules
}

/**
 * @description: 解构路由的记录
 */
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}
