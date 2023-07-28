<template>
  <div class="flex items-center justify-between h-12 pt-4">
    <span class="mr-4 text-xl font-bold">{{ '回溯数据' }} </span>
  </div>
  <ElDivider></ElDivider>
  <ElTable :data="retrospectiveData" :height="400">
    <ElTableColumn prop="date" label="日期"></ElTableColumn>
    <ElTableColumn prop="income" label="损益"></ElTableColumn>
    <ElTableColumn prop="var" label="VaR"></ElTableColumn>
    <ElTableColumn prop="es" label="ES"></ElTableColumn>
    <ElTableColumn prop="stressVar" label="压力VaR"></ElTableColumn>
    <ElTableColumn prop="stressEs" label="压力ES"></ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElDivider } from 'element-plus'
import { retrospectiveData } from './data'
</script>
