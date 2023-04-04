<template>
  <div class="flex justify-center pt-4"> <ElDatePicker v-model="day"></ElDatePicker></div>
  <ElDivider></ElDivider>
  <ElTable :data="portfolioData">
    <ElTableColumn prop="name" label="组合"></ElTableColumn>
    <ElTableColumn prop="present" label="现值"></ElTableColumn>
    <ElTableColumn prop="var" label="VaR"></ElTableColumn>
    <ElTableColumn prop="es" label="ES"></ElTableColumn>
    <ElTableColumn prop="stressVar" label="压力VaR"></ElTableColumn>
    <ElTableColumn prop="stressEs" label="压力ES"></ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElDivider, ElDatePicker } from 'element-plus'
import { portfolioData } from './data'
import { ref } from 'vue'

const day = ref(new Date())
</script>
