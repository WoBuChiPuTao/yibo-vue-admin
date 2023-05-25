import { http } from '@/utils/axios/index'

interface TableDataType {
  instCode: string
  instName: string
  bondType: string
  marketType: string
  market: string
  marketCode: string
  issuer: string
  issuingDate: string
  issuePrice: number
  valueDate: string
  dueDate: string
  maturityPeriod: string | null
  coupon: number
  templateCode: string
}

export function getBondData() {
  return http.post<TableDataType[]>('/bond')
}

export function putBondData(data: TableDataType) {
  return http.put('/bond', data)
}

export function delBondData(param: string) {
  return http.delete('/bond', { instCode: param })
}
