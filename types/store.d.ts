type Menu = import('./list').Menu

export type LocaleType = 'zh-CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

/**
 * @description: 用户角色信息
 */
export interface RoleInfo {
  roleId: string
  roleName: string
  state: boolean
  createTime: string
  remarks?: string
  menu?: Menu[]
}

/**
 * @description: 用户信息
 */
export interface UserInfo {
  userId: string
  userName: string
  alias: string
  avatar?: string
  homePath?: string
  department?: string
  position?: string
  email?: string
  phone?: string
  remarks?: string
}

/**
 * @description: 用户状态信息
 *
 */
export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: string[]
  sessionTimeout?: boolean
  lastUpdateTime: number
  isDynamicAddedRoute: boolean
}
