<template>
  <div v-if="getIsMobile" class="mobile-side-drawer">
    <ElDrawer
      v-model="drawerVisible"
      direction="ltr"
      :show-close="false"
      @close="handleCloseDrawer"
      :style="getsiderWidth"
    >
      <div class="side-style" :style="getsiderWidth">
        <AppLogo class="side-logo" :showText="!getCollapsed"></AppLogo>
        <Menu></Menu>
      </div>
    </ElDrawer>
  </div>
  <div v-else>
    <div class="side-fill" :style="getsiderWidth"></div>
    <div class="side-style side-fixed" :style="getsiderWidth">
      <AppLogo class="side-logo" :showText="!getCollapsed"></AppLogo>
      <Menu></Menu>
    </div>
  </div>
</template>

<script lang="ts">
import AppLogo from '@/components/application/AppLogo.vue'
import { ElDrawer } from 'element-plus'
import { computed, CSSProperties, defineComponent, ref, unref, watch } from 'vue'
import Menu from '@/components/menu/LayoutMenu.vue'

import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { useAppInject } from '@/hooks/web/useAppInject'

export default defineComponent({
  name: 'AppSide',
  components: { Menu, AppLogo, ElDrawer },
  setup() {
    const { getRealWidth, getCollapsed, setSiderSetting } = useSiderSetting()
    const { getIsMobile } = useAppInject()

    const getsiderWidth = computed((): CSSProperties => {
      const width = `${unref(getRealWidth)}px`
      return {
        width: width,
        maxWidth: width,
        minWidth: width
      }
    })

    const drawerVisible = ref(false)

    watch(
      () => getCollapsed.value,
      (newVal) => {
        drawerVisible.value = !newVal
      },
      { immediate: true }
    )

    function handleCloseDrawer() {
      setSiderSetting({ collapsed: true })
    }
    return {
      getsiderWidth,
      getCollapsed,
      getIsMobile,
      drawerVisible,
      handleCloseDrawer
    }
  }
})
</script>

<style lang="less" scoped>
.side-style {
  transition: all 0.2s;
  background-color: var(--sider-bg-color);
  height: 100%;
  overflow: hidden;
  z-index: 100;
}

.side-fill {
  height: 100%;
  transition: all 0.2s;
}

.side-fixed {
  position: fixed;
  top: 0;
  left: 0;
}

// 修改原有elDrawer样式
.mobile-side-drawer {
  :deep(.el-drawer) {
    background-color: var(--sider-bg-color);

    .el-drawer__header {
      height: 0;
      padding: 0;
      margin: 0;
    }

    .el-drawer__body {
      padding: 0;
    }
  }
}

.side-logo {
  height: @header-height;
  padding: 10px 8px 10px 8px;
  color: var(--sider-text-hover-color);
}
</style>
