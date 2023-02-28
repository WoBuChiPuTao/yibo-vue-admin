import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

export const SiderTrigger = createAsyncComponent(
  () => import('./trigger/SiderTrigger.vue')
)

export const BreadCrumb = createAsyncComponent(
  () => import('./crumb/BreadCrumb.vue')
)

export const AppSearch = createAsyncComponent(
  () => import('./search/AppSearch.vue')
)

export const FullScreen = createAsyncComponent(
  () => import('./fullScreen/FullScreen.vue')
)

export const AppNotice = createAsyncComponent(
  () => import('./notice/AppNotice.vue')
)

export const AppSetting = createAsyncComponent(
  () => import('./setting/AppSetting.vue')
)

export const UserDropdown = createAsyncComponent(
    () => import('./user/UserDropdown.vue')
  )
