<template>
  <ElRow :gutter="24">
    <ElCol :span="14" class="i-enter-x">
      <RIskContrastChart></RIskContrastChart>
    </ElCol>
    <ElCol :span="10" class="enter-y">
      <RIskContrastTable></RIskContrastTable>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import RIskContrastTable from './RIskContrastTable.vue'
import RIskContrastChart from './RIskContrastChart.vue'
</script>
