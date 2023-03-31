<template>
  <div @click="openDrawer">
    <ElIcon>
      <Setting></Setting>
    </ElIcon>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import SettingDrawer, { drawerVisibile } from './SettingDrawer'

export default defineComponent({
  name: 'AppSetting',
  components: { ElIcon, Setting, SettingDrawer },
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
.mode-center {
  margin: 0 auto;
}
</style>
