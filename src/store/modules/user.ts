import { defineStore } from 'pinia'
import { LoginParam, UserState, UserInfoRes } from '@/types/user'
import { RoleEnum } from '@/types/enums/roleEnm'
import { login, getUserInfo } from '@/api/sys/user'
import { router } from '@/router'
import { asyncRoutes } from '@/router/routes/modules/index'
import { store } from '../index'
import { WebCache } from '@/utils/cache'
import { RouteRecordRaw } from 'vue-router'
import { flatMultiRoutes } from '@/hooks/route'

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
    getUserInfo(): UserInfoRes {
      return (
        this.userInfo || WebCache.getLocal('USER_INFO') || ({} as UserInfoRes)
      )
    },
    getToken(): string {
      return this.token || (WebCache.getLocal('TOKEN_') as string)
    },
    getRoleList(): RoleEnum[] {
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
    },
    setToken(info: string | undefined) {
      if (info) {
        this.token = info
      } else {
        this.token = ''
      }
      WebCache.setLocal('TOKEN_', info, 500)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
    },
    setUserInfo(info: UserInfoRes | null) {
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
    async toLogin(params: LoginParam): Promise<UserInfoRes | null> {
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
    async afterLogin(): Promise<UserInfoRes | null> {
      if (!this.token) return null
      const userInfo = await this.getUserInfoApi()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        // 可以动态添加路由
        // 构建路由
        const routes = flatMultiRoutes(asyncRoutes as RouteRecordRaw[])
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        this.setIsDynamicAddedRoute(true)
        await router.replace('/home')
      }
      return userInfo
    },
    /**
     * @description: 得到用户信息
     */
    async getUserInfoApi(): Promise<UserInfoRes | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (Array.isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
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
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push('/login')
    }
  }
})

export function useUserStoreOther() {
  return useUserStore(store)
}
