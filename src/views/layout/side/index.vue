<template>
  <div class="side-fill" :style="getDomStyle"></div>
  <ElMenu
    class="side-fixed"
    :style="getDomStyle"
    :collapse="getCollapsed"
    :collapse-transition="true"
  >
    <DemoMenu :items="menus" :collapsed="getCollapsed"></DemoMenu>
  </ElMenu>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import DemoMenu from './DemoMenu.vue'
import { ElMenu } from 'element-plus'
import { useLeftMenu } from './useMenu'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu, ElMenu },
  setup() {
    const { menuRef } = useLeftMenu()

    const menus = computed(() => {
      const menu = unref(menuRef)
      return menu
    })

    const { getCollapsed, getRealWidth } = useMenuSetting()

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
      menus,
      getDomStyle,
      getCollapsed
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
  background-color: #001529;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 510;
}
</style>
