<template>
  <div>
    <Card class="m-4">
      <template #header>
        <div class="flex justify-between">
          <ElButton @click="handleExport">导出excel</ElButton>
        </div>
      </template>
      <ElTable ref="table" :data="excelData" :height="tableHeight">
        <template v-for="item in Object.keys(excelHeader)" :key="item">
          <ElTableColumn :prop="item" :label="excelHeader[item]"></ElTableColumn>
        </template>
      </ElTable>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import { excelData, excelHeader } from './data'
import Card from '@/components/card/Card.vue'
import { useExportXlsx } from '@/components/excel/exportExcel'
import { useTableHeight } from '@/components/table/useTableHeight'

export default defineComponent({
  name: 'ExportExcel',
  components: { Card, ElButton, ElTable, ElTableColumn },
  setup() {
    const table = ref()
    const { tableHeight } = useTableHeight(
      table,
      computed(() => excelData)
    )
    function handleExport() {
      useExportXlsx({ data: excelData, header: excelHeader })
    }
    return {
      excelHeader,
      excelData,
      table,
      tableHeight,
      handleExport
    }
  }
})
</script>
