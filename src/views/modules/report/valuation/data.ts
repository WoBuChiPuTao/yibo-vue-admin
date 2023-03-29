export const valuationParam = [
  {
    type: '债券',
    config: [
      { label: 'DV01', content: '零息利率' },
      { label: 'CS01', content: '信用利差' }
    ]
  },
  {
    type: '利率',
    config: [{ label: 'DV01', content: '零息利率' }]
  },
  {
    type: '信用',
    config: [{ label: 'CS01', content: '信用利差' }]
  },
  {
    type: '外汇',
    config: [
      { label: 'Delta', content: 'TRUE' },
      { label: 'Gamma', content: 'TRUE' },
      { label: 'Vega', content: 'TRUE' },
      { label: 'Volga', content: 'TRUE' },
      { label: 'Vanna', content: 'TRUE' }
    ]
  }
]

export const valuationValue = [
  { label: '货币', content: Math.random() > 0.5 ? 'CNY' : 'USD' },
  { label: '市值', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '日损益', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '总损益', content: (Math.random() * 2000 - 1000).toFixed(4) }
]
