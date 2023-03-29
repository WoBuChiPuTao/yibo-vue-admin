<template>
  <ElRow :gutter="30">
    <ElCol :span="18"><LineChart /></ElCol>
    <ElCol :span="6"> <PriceTable></PriceTable></ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import LineChart from './LineChart.vue'
import PriceTable from './PriceTable.vue'
</script>
