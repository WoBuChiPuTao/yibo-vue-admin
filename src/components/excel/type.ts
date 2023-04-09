export interface ExcelData<T = any> {
  sheetName: string
  header: string[]
  results: T[]
}
