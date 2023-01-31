<template>
  <ElIcon size="20">
    <Fold v-if="getCollapsed"></Fold>
    <Expand v-else></Expand>
  </ElIcon>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import { Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'SiderTrigger',
  components: { ElIcon, Fold, Expand },
  setup() {
    const getCollapsed = true
    return {
      getCollapsed
    }
  }
})
</script>
