<template>
  <div v-if="getShowHeader" class="header-fill" :style="getDomHeight"></div>
  <div v-if="getShowHeader" class="header-fixed" :style="{ ...getDomWidth, ...getDomHeight }">
    <LayoutHeader></LayoutHeader>
    <Tabs v-if="getShowTabs"></Tabs>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import Tabs from '../tabs/index.vue'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { useTabsSetting } from '@/hooks/setting/useTabsSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader, Tabs },
  setup() {
    const { getRealWidth, getShowSideMenu } = useSiderSetting()
    const { getShowHeader, getHeaderHeight } = useHeaderSetting()
    const { getShowTabs, getTabsHeight } = useTabsSetting()
    const getDomWidth = computed((): CSSProperties => {
      return {
        width: unref(getShowSideMenu) ? `calc(100% - ${unref(getRealWidth)}px)` : '100%'
      }
    })

    const getDomHeight = computed((): CSSProperties => {
      return {
        height: `calc(${unref(getHeaderHeight)}px + ${unref(getTabsHeight)}px)`
      }
    })
    return {
      getShowHeader,
      getShowTabs,
      getDomWidth,
      getDomHeight
    }
  }
})
</script>

<style lang="less" scoped>
.header-fill {
  height: calc(@header-height + @tabs-height);
  flex-shrink: 0;
}

.header-fixed {
  transition: all 0.2s;
  position: fixed;
  top: 0;
  z-index: 505;
}
</style>
