import { RoleEnum } from '@/enums/roleEnm'

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
  roleName: string
  value: string
}

/**
 * @description: 用户信息
 */
export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar?: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}

/**
 * @description: 用户状态信息
 *
 */
export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
  isDynamicAddedRoute: boolean
}
