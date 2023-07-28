<template>
  <div class="flex justify-center pt-4"> <ElDatePicker v-model="day"></ElDatePicker></div>
  <ElDivider></ElDivider>
  <ElTable :data="stressTableData" row-key="name" :height="300">
    <ElTableColumn prop="name" label="组合"></ElTableColumn>
    <ElTableColumn prop="present" label="现值"></ElTableColumn>
    <ElTableColumn prop="income" label="日损益"></ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElDivider, ElDatePicker } from 'element-plus'
import { stressTableData } from './data'
import { ref } from 'vue'

const day = ref(new Date())
</script>
