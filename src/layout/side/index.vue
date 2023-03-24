<template>
  <div class="side-fill" :style="getDomStyle"></div>
  <div class="side-fixed" :style="getDomStyle">
    <AppLogo class="side-logo"></AppLogo>
    <Menu></Menu>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import Menu from '@/components/menu/LayoutMenu.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
export default defineComponent({
  name: 'AppSide',
  components: { Menu },
  setup() {
    const { getRealWidth } = useMenuSetting()
    const getDomStyle = computed((): CSSProperties => {
      const width = `${unref(getRealWidth)}px`
      return {
        width: width,
        overflow: 'hidden',
        flex: `0 0 ${width}`,
        maxWidth: width,
        minWidth: width
      }
    })
    return {
      getDomStyle
    }
  }
})
</script>

<style lang="less">
.side-fill {
  height: 100%;
  transition: all 0.2s;
}

.side-fixed {
  transition: all 0.2s;
  background-color: var(--sider-bg-color);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
}

.side-logo {
  height: 64px;
  padding: 10px 8px 10px 8px;
  color: white;
}
</style>
