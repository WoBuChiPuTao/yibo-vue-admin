import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/sys/user'
import { router } from '@/router'
import { asyncRoutes } from '@/router/routes/modules/index'
import { store } from '../index'
import { WebCache } from '@/utils/cache'
import { RouteRecordRaw } from 'vue-router'
import { flatMultiRoutes } from '@/hooks/route'
import { PageEnum } from '@/enums/pageEnum'
import { UserInfo, UserState } from '#/store'
import { LoginParam } from '#/api'
// import { usePermissionStore } from './permission'

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    isDynamicAddedRoute: false,
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || WebCache.getLocal('USER_INFO') || ({} as UserInfo)
    },
    getToken(): string {
      return this.token || (WebCache.getLocal('TOKEN_') as string)
    },
    getRoleList(): string[] {
      return this.roleList.length > 0 ? this.roleList : []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
      this.isDynamicAddedRoute = false
      WebCache.removeLocal('TOKEN_')
      WebCache.removeLocal('USER_INFO')
    },
    setToken(info: string | undefined) {
      if (info) {
        this.token = info
      } else {
        this.token = ''
      }
      WebCache.setLocal('TOKEN_', info)
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      WebCache.setLocal('USER_INFO', info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    setIsDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    /**
     * @description: login
     */
    async toLogin(params: LoginParam): Promise<UserInfo | null> {
      try {
        const { ...loginParam } = params
        const data = await login(loginParam)
        const { token } = data
        // save token
        this.setToken(token)
        return this.afterLogin()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLogin(): Promise<UserInfo | null> {
      if (!this.token) return null
      const userInfo = await this.getUserInfoApi()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        // 动态添加路由
        // const { buildRoutes } = usePermissionStore()
        // const routes = await buildRoutes()
        const routes = asyncRoutes
        // 构建路由
        // const flatRoutes = flatMultiRoutes(asyncRoutes as RouteRecordRaw[])
        const flatRoutes = flatMultiRoutes(routes as RouteRecordRaw[])
        flatRoutes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        // 添加路由已经添加的状态
        this.setIsDynamicAddedRoute(true)
        await router.replace(PageEnum.BASE_HOME)
      }
      return userInfo
    },
    /**
     * @description: 得到用户信息
     */
    async getUserInfoApi(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (Array.isArray(roles)) {
        const roleList = roles.map((item) => item.value) as string[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout();
        } catch {
          console.log('注销Token失败')
        }
      }
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})

export function useUserStoreOther() {
  return useUserStore(store)
}
