<template>
  <div>
    <input
      ref="inputRef"
      type="file"
      accept=".xlsx,.xls"
      @change="handleInputUpload"
      v-show="false"
    />
    <div @click="handleUpload">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import * as Xlsx from 'xlsx'
import dayjs from 'dayjs'
import { ExcelData } from './type'

const props = defineProps({
  formatDate: String
})

const emits = defineEmits(['success', 'error'])

const inputRef = ref<HTMLInputElement>()
const loading = ref(false)

// 用第一行作为头部
function getExcelHeader(workSheet: Xlsx.Sheet) {
  if (!workSheet || !workSheet['!ref']) return []
  const excelHeader: string[] = []
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = Xlsx.utils.decode_range(workSheet['!ref'])

  const R = range.s.r
  /* start in the first row */
  for (let C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = workSheet[Xlsx.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = Xlsx.utils.format_cell(cell)
    excelHeader.push(hdr)
  }
  return excelHeader
}

function getExcelData(workBook: Xlsx.WorkBook) {
  const excelData: ExcelData[] = []
  const { formatDate } = props
  for (const sheetName of workBook.SheetNames) {
    const workSheet = workBook.Sheets[sheetName]
    const header = getExcelHeader(workSheet)
    let results = Xlsx.utils.sheet_to_json(workSheet, {
      raw: true,
      dateNF: formatDate // Not worked
    }) as object[]
    results = results.map((row: object) => {
      for (const field in row) {
        if (row[field] instanceof Date) {
          if (formatDate) {
            row[field] = dayjs(row[field]).format(formatDate)
          }
        }
      }
      return row
    })
    excelData.push({
      sheetName,
      header,
      results
    })
  }
  return excelData
}

async function readData(file: File) {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = e.target?.result
        const workBook = Xlsx.read(data, { type: 'array', cellDates: true })
        const excelData = getExcelData(workBook)
        resolve('success')
        emits('success', excelData)
      } catch (error) {
        reject(error)
        emits('error', error)
      } finally {
        loading.value = false
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

async function handleInputUpload(e: Event) {
  const target = e && (e.target as HTMLInputElement)
  const files = target && target.files
  const rawFile = files && files[0]
  if (!rawFile) return
  // 修复传入同样的文件
  target.value = ''
  await readData(rawFile)
}

function handleUpload() {
  const inputDom = unref(inputRef)
  inputDom && inputDom.click()
}
</script>
