export const descriptionParam = [
  { label: '利率折现曲线', content: 'CN_TREAS_PRIME' },
  { label: '利率远期曲线', content: 'CN_TREAS_PRIME' },
  { label: '信用利差曲线', content: 'CNY_MTN_AAA_SPRD_PRIME' },
  { label: 'DV01', content: '关键期限零息利率' },
  { label: 'CS01', content: '关键期限信用利差' },
  { label: 'Theta', content: 'TRUE' }
]

export const descriptionValue = [
  { label: 'NPV', content: Number((Math.random() * 2000 + 1000).toFixed(4)) },
  { label: '全价', content: Number((Math.random() * 100).toFixed(4)) },
  { label: '净价', content: Number((Math.random() * 100).toFixed(4)) },
  { label: '应计利息', content: Number((Math.random() * 6 - 3).toFixed(4)) },
  { label: '到期收益率', content: Number((Math.random() * 1).toFixed(4)) },
  { label: '久期', content: Number((Math.random() * 10).toFixed(4)) },
  { label: '修正久期', content: Number((Math.random() * 10).toFixed(4)) },
  { label: '凸性', content: Number((Math.random() * 45).toFixed(4)) }
]

export const chartMonthValue = [...new Array(3)].map((_, index) => {
  if (index === 0) {
    return [...new Array(30)].map((_, i) => {
      const day = new Date(new Date().getTime() - (30 - i) * 24 * 60 * 60 * 1000)
      return day.toLocaleDateString().replace(/\//g, '-')
    })
  }
  return [...new Array(30)].map(() => Number((Math.random() * 10000 + 3000).toFixed(2)))
})

export const options = [
  {
    label: 'NPV',
    value: 'npv'
  },
  {
    label: '全价',
    value: 'fullPrice'
  },
  {
    label: '到期收益率',
    value: 'yieldToMaturity'
  }
]
