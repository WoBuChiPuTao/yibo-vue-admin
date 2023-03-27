<template>
  <div class="header-fill"></div>
  <div class="header-fixed header-container" :style="getDomStyle">
    <LayoutHeader></LayoutHeader>
    <Tabs></Tabs>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import Tabs from '../tabs/index.vue'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader, Tabs },
  setup() {
    const { getRealWidth, getShowSideMenu } = useSiderSetting()
    const getDomStyle = computed((): CSSProperties => {
      return {
        width: unref(getShowSideMenu) ? `calc(100% - ${unref(getRealWidth)}px)` : '100%'
      }
    })
    return {
      getDomStyle
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
