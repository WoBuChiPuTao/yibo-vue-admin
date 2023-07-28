<template>
  <div>
    <Card class="m-4">
      <template #header>
        <div class="flex justify-between">
          <ElButton @click="handleExport">导出excel</ElButton>
        </div>
      </template>
      <div :style="{ height: tableHeight }">
        <ElAutoResizer>
          <template #default="{ width, height }">
            <ElTableV2
              ref="table"
              :columns="columns"
              :data="excelData"
              :width="width"
              :height="height"
            >
            </ElTableV2>
          </template>
        </ElAutoResizer>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Column, ElButton, ElTableV2, ElAutoResizer } from 'element-plus'
import { excelData, excelHeader } from './data'
import Card from '@/components/card/Card.vue'
import { useExportXlsx } from '@/components/excel/exportExcel'
import { useTableHeight } from '@/components/table/useTableHeight'

export default defineComponent({
  name: 'ExportExcel',
  components: { Card, ElButton, ElTableV2, ElAutoResizer },
  setup() {
    const table = ref()
    const { tableHeight } = useTableHeight(
      table,
      computed(() => excelData),
      40,
      2
    )

    const columns = computed(() => {
      const arr: Column<any>[] = []
      Object.keys(excelHeader).forEach((key) => {
        arr.push({
          key: key,
          align: 'center',
          title: excelHeader[key],
          dataKey: key,
          width: 120
        })
      })
      return arr
    })

    function handleExport() {
      useExportXlsx({ data: excelData, header: excelHeader })
    }
    return {
      excelHeader,
      excelData,
      table,
      tableHeight,
      columns,
      handleExport
    }
  }
})
</script>
