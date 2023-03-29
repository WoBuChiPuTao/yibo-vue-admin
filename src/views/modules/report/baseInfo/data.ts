import { BondTradeInfo } from './type'

export const tradeData: BondTradeInfo[] = [...new Array(109)].map((_, index) => {
  const randomTime = new Date()
  return {
    Index: index + 1 + '',
    tradeCode: 'T' + (Math.random() * 999999 + 1000000).toFixed(0),
    BondCode: '101800321.IB',
    BondName: '18陕煤化MTN002',
    isBuy: Math.random() > 0.5,
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
