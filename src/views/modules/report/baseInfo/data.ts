import { useI18n } from '@/hooks/web/useI18n'
import { BondTradeInfo } from './type'
const { t } = useI18n()

export const tradeData: BondTradeInfo[] = [...new Array(109)].map((_, index) => {
  const randomTime = new Date(new Date().getTime() - index * 24 * 60 * 60 * 1000)
  return {
    Index: index + 1 + '',
    tradeCode: 'T' + (Math.random() * 999999 + 1000000).toFixed(0),
    BondCode: '101800321.IB',
    BondName: '18陕煤化MTN002',
    isBuy: Math.random() > 0.5 ? 'TRUE' : 'FALSE',
    principal: 100000,
    tradePrice: (Math.random() * 10000 + (100000 - 10000)).toFixed(0),
    accrualConventions: 'ACT_ACT_ISDA',
    tradeDate: randomTime.toLocaleDateString().replace(/\//g, '-'),
    exteriorId: '',
    tradeDesk: '',
    trader: 'YiBo',
    tradeStatus: Math.random() > 0.5 ? '存活' : '过期'
  }
})

export const tradeTableColumn = [
  {
    prop: 'index',
    label: 'Index'
  },
  {
    prop: 'tradeCode',
    label: t('module.report.information.tradeId'),
    minWidth: '90'
  },
  {
    prop: 'BondCode',
    label: t('module.report.information.productCode'),
    minWidth: '120'
  },
  {
    prop: 'BondName',
    label: t('module.report.information.productName'),
    minWidth: '140'
  },
  {
    prop: 'isBuy',
    label: t('module.report.information.principal')
  },
  {
    prop: 'tradePrice',
    label: t('module.report.information.tradePrice'),
    minWidth: ''
  },
  {
    prop: 'accrualConventions',
    label: t('module.report.information.InterestAccrualConvention'),
    minWidth: ''
  },
  {
    prop: 'tradeDate',
    label: t('module.report.information.tradeDate')
  },
  {
    prop: 'tradeDesk',
    label: t('module.report.information.tradeDesk')
  },
  {
    prop: 'trader',
    label: t('module.report.information.trader'),
    minWidth: ''
  },
  {
    prop: 'exteriorId',
    label: t('module.report.information.externalID'),
    minWidth: ''
  },
  {
    prop: 'tradeStatus',
    label: t('module.report.information.tradeStatus')
  }
]
