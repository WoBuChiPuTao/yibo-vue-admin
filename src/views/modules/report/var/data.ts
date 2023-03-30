export const varParam = [
  { label: '报告货币', content: 'CNY' },
  { label: '压力情景', content: '2022-10月份' },
  { label: '因子集合', content: 'CNH中国主权国债曲线' },
  { label: '置信区间', content: '0.95' },
  { label: '情景数', content: '200' },
  { label: '流动性期限', content: '1' },
  { label: '损益矩阵', content: 'TRUE' }
]

export const varValue = [
  { label: '现值', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: 'VaR', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: 'ES', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '压力VaR', content: (Math.random() * 2000 - 1000).toFixed(4) },
  { label: '压力ES', content: (Math.random() * 2000 - 1000).toFixed(4) }
]

export const varOption = ['现值', 'VaR', 'ES', '压力VaR', '压力ES']
