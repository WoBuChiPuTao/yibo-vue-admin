<template>
  <ElHeader class="header" :style="getDomHeight">
    <div class="header-left">
      <AppLogo v-if="getShowHeaderMenu" :show-text="!getIsMobile" />
      <SiderTrigger
        v-if="!getShowHeaderMenu || getIsMobile"
        class="header-left-item"
      ></SiderTrigger>
      <BreadCrumb
        v-if="!getShowHeaderMenu && getShowBreadCrumb && !getIsMobile"
        class="flex items-center px-4"
      ></BreadCrumb>
    </div>

    <div v-if="getShowHeaderMenu && !getIsMobile" class="header-menu">
      <Menu></Menu>
    </div>
    <div class="header-action">
      <AppNotice v-if="getShowNotice" class="header-action-item"></AppNotice>
      <FullScreen v-if="getShowFullScreen" class="header-action-item"></FullScreen>
      <AppLocalePicker
        v-if="getShowMultLang"
        class="header-action-item locale-picker-span"
      ></AppLocalePicker>
      <UserDropdown class="header-action-item"></UserDropdown>
      <AppSetting v-if="getShowSetting" class="header-action-item"></AppSetting>
    </div>
  </ElHeader>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import { ElHeader } from 'element-plus'
import { SiderTrigger, AppNotice, FullScreen, UserDropdown, BreadCrumb } from './components/index'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import AppLogo from '@/components/application/AppLogo.vue'
import Menu from '@/layout/menu/LayoutMenu.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useAppInject } from '@/hooks/web/useAppInject'

export default defineComponent({
  name: 'layoutHeader',
  components: {
    AppLogo,
    Menu,
    ElHeader,
    SiderTrigger,
    AppNotice,
    FullScreen,
    UserDropdown,
    AppSetting: createAsyncComponent(() => import('../setting/AppSetting.vue'), {
      loading: true
    }),
    BreadCrumb,
    AppLocalePicker: createAsyncComponent(
      () => import('@/components/application/AppLocalePicker.vue'),
      {
        loading: true
      }
    )
  },
  setup() {
    const {
      getHeaderHeight,
      getShowBreadCrumb,
      getShowFullScreen,
      getShowMultLang,
      getShowNotice,
      getShowSetting,
      getShowHeaderMenu
    } = useHeaderSetting()
    const { getIsMobile } = useAppInject()

    const getDomHeight = computed((): CSSProperties => {
      return {
        height: `${unref(getHeaderHeight)}px`
      }
    })

    return {
      getDomHeight,
      getShowHeaderMenu,
      getShowBreadCrumb,
      getShowFullScreen,
      getShowMultLang,
      getShowNotice,
      getShowSetting,
      getIsMobile
    }
  }
})
</script>

<style lang="less" scoped>
@import './header.less';
</style>
