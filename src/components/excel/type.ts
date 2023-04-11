import type { JSON2SheetOpts, WritingOptions } from 'xlsx'

export interface ExcelData<T = any> {
  sheetName: string
  header: string[]
  results: T[]
}

export interface ExportExcelParam<T = any> {
  fileName?: string
  json2SheetOpts?: JSON2SheetOpts
  writingOptions?: WritingOptions
  data: T[]
  header?: {
    [K in keyof T]: string
  }
}
