<template>
  <ElTable
    :data="limitData"
    :style="{ width: '100%' }"
    :rowClassName="tableRowClassName"
    class="enter-y"
  >
    <ElTableColumn prop="date" label="日期"></ElTableColumn>
    <ElTableColumn prop="target" label="指标"></ElTableColumn>
    <ElTableColumn prop="limit" label="限额"></ElTableColumn>
    <ElTableColumn prop="together" label="聚合"></ElTableColumn>
    <ElTableColumn prop="threshold" label="阈值"></ElTableColumn>
    <ElTableColumn prop="useRate" label="使用率"></ElTableColumn>
    <ElTableColumn prop="lateExportTime" label="最近出口时间"></ElTableColumn>
    <ElTableColumn prop="maxExceed" label="最大敞口"></ElTableColumn>
    <ElTableColumn prop="averageExceed" label="平均敞口"></ElTableColumn>
    <ElTableColumn prop="minExceed" label="最小敞口"></ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus'
import { limitData } from './data'
import { LimitInfo } from './type'

const tableRowClassName = ({ row }: { row: LimitInfo; rowIndex: number }) => {
  const rate = Number(row.useRate.replace(/%/, ''))
  if (rate >= 100) {
    return 'error-row'
  } else if ((row.limit * rate) / 100 >= row.threshold) {
    return 'warning-row'
  }
  return ''
}
</script>

<style lang="less">
.el-table .error-row {
  --el-table-tr-bg-color: var(--el-color-error-light-7);
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
