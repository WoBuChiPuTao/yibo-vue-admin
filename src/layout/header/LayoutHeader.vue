<template>
  <ElHeader class="header">
    <div class="header-left">
      <AppLogo v-if="getIsTopMenu" />
      <SiderTrigger v-if="!getIsTopMenu" class="header-left-item"></SiderTrigger>
      <BreadCrumb v-if="!getIsTopMenu" class="header-left-item"></BreadCrumb>
    </div>

    <div v-if="getShowMenu && getIsTopMenu" class="header-menu">
      <Menu></Menu>
    </div>
    <div class="header-action">
      <AppNotice class="header-action-item notice-i"></AppNotice>
      <FullScreen class="header-action-item"></FullScreen>
      <AppLocalePicker class="header-action-item locale-picker-span"></AppLocalePicker>
      <UserDropdown class="header-action-item"></UserDropdown>
      <AppSetting class="header-action-item"></AppSetting>
    </div>
  </ElHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElHeader } from 'element-plus'
import { SiderTrigger, AppNotice, FullScreen, UserDropdown, BreadCrumb } from './components/index'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import AppLogo from '@/components/application/AppLogo.vue'
import Menu from '@/components/menu/LayoutMenu.vue'

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
    const { getShowMenu, getIsTopMenu } = useSiderSetting()
    return { getIsTopMenu, getShowMenu }
  }
})
</script>

<style lang="less" scoped>
@import './header.less';
</style>
