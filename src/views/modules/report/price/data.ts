export const descriptionParam = [
  { label: '利率折现曲线', content: 'CN_TREAS_PRIME' },
  { label: '利率远期曲线', content: 'CN_TREAS_PRIME' },
  { label: '信用利差曲线', content: 'CNY_MTN_AAA_SPRD_PRIME' },
  { label: 'DV01', content: '关键期限零息利率' },
  { label: 'CS01', content: '关键期限信用利差' },
  { label: 'Theta', content: 'TRUE' }
]

export const descriptionValue = [
  { label: 'NPV', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '全价', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '净价', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '应计利息', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '到期收益率', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '久期', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '修正久期', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '凸性', content: (Math.random() * 2000 - 1000).toFixed(4) }
]
