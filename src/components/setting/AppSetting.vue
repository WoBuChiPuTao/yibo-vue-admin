<template>
  <div @click="openDrawer">
    <ElTooltip content="设置">
      <ElIcon>
        <Setting></Setting>
      </ElIcon>
    </ElTooltip>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'
import SettingDrawer, { drawerVisibile } from './SettingDrawer'

export default defineComponent({
  name: 'AppSetting',
  components: { ElIcon, Setting, ElTooltip, SettingDrawer },
  setup() {
    function openDrawer() {
      drawerVisibile.value = true
    }
    return {
      openDrawer
    }
  }
})
</script>

<style lang="less">
@import './index.less';
</style>
