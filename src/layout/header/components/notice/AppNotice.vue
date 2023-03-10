<template>
  <div>
    <ElTooltip content="通知">
      <el-icon>
        <ElBadge :is-dot="true">
          <Bell />
        </ElBadge>
      </el-icon>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon, ElTooltip, ElBadge } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'AppNotice',
  components: { ElTooltip, ElIcon, Bell, ElBadge },
  setup() {
    return {}
  }
})
</script>
