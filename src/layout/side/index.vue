<template>
  <div class="side-fill" :style="getDomStyle"></div>
  <CollapseTransition>
    <div class="side-fixed" :style="getDomStyle">
      <DemoMenu :items="menus" :collapsed="getCollapsed"></DemoMenu>
    </div>
  </CollapseTransition>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import DemoMenu from './DemoMenu.vue'
// import { ElMenu } from 'element-plus'
import { useLeftMenu } from './useMenu'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import CollapseTransition from '@/components/Transition/CollapseTransition.vue'

export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu, CollapseTransition },
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
  background-color: var(--sider-bg-color);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
}
</style>
