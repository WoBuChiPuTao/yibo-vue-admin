<template>
  <ElRow :gutter="24">
    <ElCol :span="12" class="i-enter-x"><StressChart></StressChart></ElCol>
    <ElCol :span="12" class="enter-y"><StressTable></StressTable> </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import StressChart from './StressChart.vue'
import StressTable from './StressTable.vue'
</script>
