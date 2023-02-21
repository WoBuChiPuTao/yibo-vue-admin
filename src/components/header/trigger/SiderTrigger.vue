<template>
  <div @click="toggleCollapsed" class="flex">
    <ElIcon size="20">
      <Fold v-if="!getCollapsed"></Fold>
      <Expand v-else></Expand>
    </ElIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'SiderTrigger',
  components: { ElIcon, Fold, Expand },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()
    return {
      getCollapsed,
      toggleCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.flex{
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
