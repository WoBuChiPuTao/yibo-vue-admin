<template>
  <ElHeader class="header">
    <div class="header-left">
      <SiderTrigger></SiderTrigger>
      <div>面包屑</div>
    </div>

    <div class="header-action">
      <AppSearch class="header-action-item"></AppSearch>
      <AppNotice class="header-action-item"></AppNotice>
      <FullScreen class="header-action-item"></FullScreen>
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

export default defineComponent({
  name: 'layoutHeader',
  components: { ElHeader, SiderTrigger, AppSearch, AppNotice, FullScreen, UserDropdown, AppSetting },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import './header.less';
</style>
