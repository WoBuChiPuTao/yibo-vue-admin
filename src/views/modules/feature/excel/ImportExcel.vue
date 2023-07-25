<template>
  <div class="flex flex-col items-center">
    <ImportExcel @success="handleExcel" class="mt-8 mb-8">
      <ElButton type="primary">导入Excel</ElButton>
    </ImportExcel>
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
import ImportExcel from '@/components/excel/ImportExcel.vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import { ExcelData } from '@/components/excel/type'

export default defineComponent({
  name: 'ImportExcelExample',
  components: { ElButton, ElTable, ElTableColumn, ImportExcel },
  setup() {
    const table = ref()
    const excelData = reactive<ExcelData>({
      header: [],
      results: [],
      sheetName: ''
    })

    const { tableHeight } = useTableHeight(
      table,
      computed(() => excelData.results),
      32
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
