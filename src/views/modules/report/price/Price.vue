<template>
  <ElRow :gutter="24">
    <ElCol :span="15" class="i-enter-x"><PriceChart /></ElCol>
    <ElCol :span="9" class="enter-y"> <PriceTable></PriceTable></ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import PriceChart from './PriceChart.vue'
import PriceTable from './PriceTable.vue'
</script>
