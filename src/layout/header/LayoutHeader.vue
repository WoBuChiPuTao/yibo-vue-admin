<template>
  <ElHeader class="header" :style="getDomHeight">
    <div class="header-left">
      <AppLogo v-if="getIsTopMenu" />
      <SiderTrigger v-if="!getIsTopMenu" class="header-left-item"></SiderTrigger>
      <BreadCrumb v-if="!getIsTopMenu && getShowBreadCrumb" class="header-left-item"></BreadCrumb>
    </div>

    <div v-if="getShowSider && getIsTopMenu" class="header-menu">
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
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import AppLogo from '@/components/application/AppLogo.vue'
import Menu from '@/components/menu/LayoutMenu.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'

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
      getShowSetting
    } = useHeaderSetting()
    const { getShowSider, getIsTopMenu } = useSiderSetting()

    const getDomHeight = computed((): CSSProperties => {
      return {
        height: `${unref(getHeaderHeight)}px`
      }
    })

    return {
      getDomHeight,
      getIsTopMenu,
      getShowSider,
      getShowBreadCrumb,
      getShowFullScreen,
      getShowMultLang,
      getShowNotice,
      getShowSetting
    }
  }
})
</script>

<style lang="less" scoped>
@import './header.less';
</style>
