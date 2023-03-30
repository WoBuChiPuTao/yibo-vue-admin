<template>
  <ElTable :data="retrospectiveData" :style="{ width: '100%' }">
    <ElTableColumn prop="date" label="日期"></ElTableColumn>
    <ElTableColumn prop="income" label="损益"></ElTableColumn>
    <ElTableColumn prop="var" label="VaR"></ElTableColumn>
    <ElTableColumn prop="es" label="ES"></ElTableColumn>
    <ElTableColumn prop="stressVar" label="压力VaR"></ElTableColumn>
    <ElTableColumn prop="stressEs" label="压力ES"></ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus'
import { retrospectiveData } from './data'
</script>
