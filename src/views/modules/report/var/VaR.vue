<template>
  <ElRow :gutter="24">
    <ElCol :span="12" class="i-enter-x">
      <VaRLeft />
    </ElCol>
    <ElCol :span="12" class="enter-y">
      <VaRTable></VaRTable>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import VaRTable from './VaRTable.vue'
import VaRLeft from './VaRLeft.vue'
</script>
