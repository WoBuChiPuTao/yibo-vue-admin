import { WorkBook, utils, writeFile } from 'xlsx'
import { ExportExcelParam } from './type'

export function useExportXlsx<T = any>({
  data,
  header,
  fileName = 'excel',
  json2SheetOpts = {},
  writingOptions = { bookType: 'xlsx' }
}: ExportExcelParam<T>) {
  const dataArr = [...data]
  if (header) {
    dataArr.unshift(header as any)
    json2SheetOpts.skipHeader = true
  }
  const workSheet = utils.json_to_sheet(dataArr, json2SheetOpts)

  const workBook: WorkBook = {
    SheetNames: [fileName],
    Sheets: {
      [fileName]: workSheet
    }
  }
  // 下载xlsx
  writeFile(workBook, fileName + '.xlsx', writingOptions)
}
