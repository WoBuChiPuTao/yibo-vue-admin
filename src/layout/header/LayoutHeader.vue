<template>
  <ElHeader class="header">
    <div class="header-left">
      <SiderTrigger class="header-left-item"></SiderTrigger>
      <BreadCrumb class="header-left-item"></BreadCrumb>
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
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

export default defineComponent({
  name: 'layoutHeader',
  components: {
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
    return {}
  }
})
</script>

<style lang="less">
@import './header.less';
</style>
