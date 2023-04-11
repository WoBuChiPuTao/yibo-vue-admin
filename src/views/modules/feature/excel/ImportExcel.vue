<template>
  <div class="flex flex-col items-center">
    <ImportExcelComponent @success="handleExcel" class="mt-8 mb-8">
      <ElButton type="primary">导入Excel</ElButton>
    </ImportExcelComponent>
    <ElTable ref="table" :data="excelData.results" :height="tableHeight">
      <template v-for="item in excelData.header" :key="item">
        <ElTableColumn :prop="item" in :label="item"></ElTableColumn>
      </template>
    </ElTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import ImportExcelComponent from '@/components/excel/ImportExcel.vue'
import { ExcelData } from '@/components/excel/type'
import { useTableHeight } from '@/components/table/useTableHeight'

export default defineComponent({
  name: 'ImportExcel',
  components: { ImportExcelComponent, ElButton, ElTable, ElTableColumn },
  setup() {
    const table = ref()
    const excelData = reactive<ExcelData>({
      header: [],
      results: [],
      sheetName: ''
    })

    const { tableHeight } = useTableHeight(
      table,
      computed(() => excelData.results)
    )

    function handleExcel(data: ExcelData[]) {
      console.log(data)
      excelData.header = data[0].header
      excelData.results = data[0].results
    }

    return {
      table,
      excelData,
      tableHeight,
      handleExcel
    }
  }
})
</script>
