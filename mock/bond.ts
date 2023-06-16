import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { Result } from '@/utils/axios/types'
import { cutUrlParams } from '@/utils'

const domain = '/api'

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

const data: TableDataType[] = [
  {
    instCode: '1111',
    instName: '032281131.IB',
    bondType: '固息债',
    marketType: '同业存单',
    market: 'CFETS',
    marketCode: '112391003.IB',
    issuer: '天津银行股份有限公司',
    issuingDate: '2023-01-20',
    issuePrice: 97.364,
    valueDate: '',
    dueDate: '2024-01-28',
    maturityPeriod: null,
    coupon: 0.00012,
    templateCode: 'CN_TREAS_ZERO'
  },
  {
    instCode: '2222',
    instName: '032281131.IB',
    bondType: '固息债',
    marketType: '同业存单',
    market: 'CFETS',
    marketCode: '112391003.IB',
    issuer: '天津银行股份有限公司',
    issuingDate: '2023-01-20',
    issuePrice: 97.364,
    valueDate: '2023-01-28',
    dueDate: '',
    maturityPeriod: '2M',
    coupon: 0.00012,
    templateCode: 'CN_TREAS_ZERO'
  }
]

Mock.mock(`${domain}/bond`, 'put', ({ body }): Result<null> => {
  const params = JSON.parse(body) as TableDataType
  const index = data.findIndex((item) => item.instCode === params.instCode)
  if (index === -1) {
    data.push(params)
  } else {
    data.splice(index, 1, params)
  }

  return {
    code: 200,
    message: 'success',
    data: null
  }
})

Mock.mock(`${domain}/bond`, 'post', ({ body }): Result<TableDataType[]> => {
  const params = JSON.parse(body) as { instCode: string }
  return {
    code: 200,
    message: 'success',
    data: params.instCode ? data.filter((item) => item.instCode === params.instCode) : data
  }
})

Mock.mock(new RegExp(`${domain}/bond`), 'delete', ({ url }): Result<null> => {
  const params = cutUrlParams(url)
  const index = data.findIndex((item) => item.instCode === params.instCode)
  if (index === -1) {
    return {
      code: 400,
      message: '未找到债券' + '1111',
      data: null
    }
  }
  data.splice(index, 1)
  return {
    code: 200,
    message: 'success',
    data: null
  }
})
