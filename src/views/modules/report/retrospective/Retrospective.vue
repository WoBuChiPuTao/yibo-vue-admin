<template>
  <ElRow :gutter="24">
    <ElCol :span="12" class="i-enter-x">
      <RetrospectiveChart></RetrospectiveChart>
    </ElCol>
    <ElCol :span="12" class="enter-y">
      <RetrospectiveTable></RetrospectiveTable>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import RetrospectiveTable from './RetrospectiveTable.vue'
import RetrospectiveChart from './RetrospectiveChart.vue'
</script>
