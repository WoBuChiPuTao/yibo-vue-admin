export const excelData = [...new Array(109)].map((_, index) => {
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

export const excelHeader = {
  Index: 'Index',
  tradeCode: '交易ID',
  BondCode: '产品代码',
  BondName: '产品名称',
  isBuy: '买卖',
  principal: '本金',
  tradePrice: '交易价格',
  accrualConventions: '计息惯例',
  tradeDate: '交易时间',
  exteriorId: '外部ID',
  tradeDesk: '交易台',
  trader: '交易员',
  tradeStatus: '状态'
}
