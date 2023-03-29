<template>
  <ElRow :gutter="30">
    <ElCol :span="12"><ValuationChart></ValuationChart></ElCol>
    <ElCol :span="12"><ValuationTable></ValuationTable></ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import ValuationTable from './ValuationTable.vue'
import ValuationChart from './ValuationChart.vue'
</script>
