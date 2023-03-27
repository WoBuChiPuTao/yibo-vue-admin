<template>
  <div @click="toggleCollapsed" class="flex">
    <ElIcon>
      <Fold v-if="!getCollapsed"></Fold>
      <Expand v-else></Expand>
    </ElIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'

export default defineComponent({
  name: 'SiderTrigger',
  components: { ElIcon, Fold, Expand },
  setup() {
    const { getCollapsed, toggleCollapsed } = useSiderSetting()
    return {
      getCollapsed,
      toggleCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.flex {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
