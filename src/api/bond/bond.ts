import { http } from '@/utils/axios/index'

interface TableDataType {
  instCode: string
  instName: string
  bondType: string
  marketType: string
  market: string
  marketCode: string
  issuer: string
  issuingDate: string | null
  issuePrice: number
  valueDate: string | null
  dueDate: string | null
  maturityPeriod: string | null
  coupon: number
  templateCode: string
}

export function getBondData(code?: string) {
  return http.post<TableDataType[]>('/bond', { instCode: code })
}

export function putBondData(data: TableDataType) {
  return http.put('/bond', data)
}

export function delBondData(param: string) {
  return http.delete('/bond', { instCode: param })
}
