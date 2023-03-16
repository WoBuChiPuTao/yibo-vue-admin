<template>
  <div>
    <el-button type="primary"></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Workbench',
  components: {
    ElButton
  },
  setup() {
    return {}
  }
})
</script>
