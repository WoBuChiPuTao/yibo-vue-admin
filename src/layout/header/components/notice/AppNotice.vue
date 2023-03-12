<template>
  <div>
    <ElPopover trigger="click">
      <template #reference>
        <el-icon>
          <ElBadge :is-dot="true">
            <Bell />
          </ElBadge>
        </el-icon>
      </template>
      <template #default>
        {{ 'aaaaaaaaaaaaaaa' }}
      </template>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon, ElBadge, ElPopover } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'AppNotice',
  components: { ElIcon, Bell, ElBadge, ElPopover },
  setup() {
    return {}
  }
})
</script>
