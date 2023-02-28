<template>
  <div>
    <ElTooltip content="通知">
      <el-icon>
        <Bell />
      </el-icon>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'AppNotice',
  components: { ElTooltip, ElIcon, Bell },
  setup() {
    return {}
  }
})
</script>
