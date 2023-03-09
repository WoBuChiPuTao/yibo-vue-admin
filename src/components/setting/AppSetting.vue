<template>
  <div @click="openDrawer">
    <ElTooltip content="设置">
      <ElIcon>
        <Setting></Setting>
      </ElIcon>
    </ElTooltip>
    <SettingDrawer :drawer-visible="drawerVisibile"></SettingDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'
import SettingDrawer from './SettingDrawer'

export default defineComponent({
  name: 'AppSetting',
  components: { ElIcon, Setting, ElTooltip, SettingDrawer },
  setup() {
    const drawerVisibile = ref(false)
    function openDrawer() {
      drawerVisibile.value = true
    }
    return { drawerVisibile, openDrawer }
  }
})
</script>
