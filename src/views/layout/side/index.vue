<template>
  <div class="side-fill"></div>
  <div class="side-fixed">
    <DemoMenu :items="menus"></DemoMenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import DemoMenu from './DemoMenu.vue'
import { useLeftMenu } from './useMenu'
export default defineComponent({
  name: 'AppSide',
  components: { DemoMenu },
  setup() {
    const { menuRef } = useLeftMenu()
    const menus = computed(() => {
      const menu = unref(menuRef)
      return menu
    })
    // const { menus } = unref(getCommonProps)
    return {
      menus
    }
  }
})
</script>

<style lang="less">
.side-fill {
  width: 210px;
  overflow: hidden;
  flex: 0 0 210px;
  max-width: 210px;
  min-width: 210px;
  transition: all 0.2s ease 0s;
}

.side-fixed {
  background-color: #001529;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  flex: 0 0 210px;
  max-width: 210px;
  min-width: 210px;
  width: 210px;
  z-index: 510;
}
</style>
