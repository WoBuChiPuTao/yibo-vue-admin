<template>
  <div style="height: 80px"></div>
  <div class="header-fixed" :style="getDomStyle">
    <LayoutHeader></LayoutHeader>
    <Tabs></Tabs>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import Tabs from '@/components/tabs/index.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader, Tabs },
  setup() {
    const { getRealWidth } = useMenuSetting()
    const getDomStyle = computed((): CSSProperties => {
      return {
        width: `calc(100% - ${unref(getRealWidth)}px)`
      }
    })
    return {
      getDomStyle
    }
  }
})
</script>

<style lang="less" scoped>
.header-fixed {
  transition: all 0.2s;
  position: fixed;
  top: 0;
  z-index: 505;
}
</style>
