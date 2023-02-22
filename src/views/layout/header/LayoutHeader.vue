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
import SiderTrigger from '@/components/header/trigger/SiderTrigger.vue'
import AppSearch from '@/components/header/search/AppSearch.vue'
import AppNotice from '@/components/header/notice/AppNotice.vue'
import FullScreen from '@/components/header/fullScreen/FullScreen.vue'
import UserDropdown from '@/components/header/user/UserDropdown.vue'
import AppSetting from '@/components/header/setting/AppSetting.vue'
import AppLocalePicker from '@/components/application/AppLocalePicker.vue'
import BreadCrumb from '@/components/header/crumb/BreadCrumb.vue'

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
