<template>
  <ElHeader class="header">
    <div class="header-left">
      <SiderTrigger class="header-left-item"></SiderTrigger>
      <BreadCrumb class="header-left-item"></BreadCrumb>
    </div>

    <div class="header-action">
      <AppSearch class="header-action-item"></AppSearch>
      <AppNotice class="header-action-item"></AppNotice>
      <FullScreen class="header-action-item"></FullScreen>
      <AppLocalePicker class="header-action-item"></AppLocalePicker>
      <UserDropdown class="header-action-item"></UserDropdown>
      <AppSetting class="header-action-item"></AppSetting>
    </div>
  </ElHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElHeader } from 'element-plus'
import AppLocalePicker from '@/components/application/AppLocalePicker.vue'
import {
  SiderTrigger,
  AppSearch,
  AppNotice,
  FullScreen,
  UserDropdown,
  AppSetting,
  BreadCrumb
} from '@/components/header/index'

export default defineComponent({
  name: 'layoutHeader',
  components: {
    ElHeader,
    SiderTrigger,
    AppSearch,
    AppNotice,
    FullScreen,
    UserDropdown,
    AppSetting,
    AppLocalePicker,
    BreadCrumb
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import './header.less';
</style>
