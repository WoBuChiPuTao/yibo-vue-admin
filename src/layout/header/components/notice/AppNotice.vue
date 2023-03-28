<template>
  <div>
    <ElPopover trigger="click">
      <template #reference>
        <div class="container">
          <ElBadge class="badge" :is-dot="true"> <Bell /></ElBadge>
        </div>
      </template>
      <template #default>
        {{ 'aaaaaaaaaaaaaaa' }}
      </template>
    </ElPopover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElBadge, ElPopover } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'AppNotice',
  components: { Bell, ElBadge, ElPopover },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.container {
  display: inline-block;
  height: 100%;
  width: 1em;
  vertical-align: middle;

  .badge {
    width: 1em;
    top: 50%;
    transform: translateY(-50%);
    vertical-align: top;
  }
}
</style>
