import { defineStore } from 'pinia'
import { LoginParam, UserState, UserInfoRes } from '@/types/user'
import { RoleEnum } from '@/enums/roleEnm'
import { login, getUserInfo } from '@/api/sys/user'
import { router } from '@/router'
import { store } from '../index'

export const userStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): UserInfoRes {
      return this.userInfo || ({} as UserInfoRes)
    },
    getToken(): string {
      return this.token || ''
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    setToken(info: string | undefined) {
      this.token = typeof info !== undefined ? info : '' // for null or undefined value
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
    },
    setUserInfo(info: UserInfoRes | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    /**
     * @description: login
     */
    async toLogin(
      params: LoginParam & { goHome?: boolean }
    ): Promise<UserInfoRes | null> {
      try {
        const { goHome = true, ...loginParam } = params
        const data = await login(loginParam)
        const { token } = data
        // save token
        this.setToken(token)
        return this.afterLogin(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLogin(goHome?: boolean): Promise<UserInfoRes | null> {
      if (!this.token) return null
      const userInfo = await this.getUserInfoApi()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
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

export function useUserStore() {
  return userStore(store)
}
