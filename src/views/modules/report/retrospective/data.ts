import { RetrospectiveTableInfo } from './type'

export const retrospectiveData: RetrospectiveTableInfo[] = [...new Array(10)].map((_, index) => {
  const day = new Date(new Date().getTime() - index * 24 * 60 * 60 * 1000)
  return {
    date: day.toLocaleDateString().replace(/\//g, '-'),
    income: (Math.random() * 2000 - 1000).toFixed(4),
    var: (Math.random() * 2000 - 1000).toFixed(4),
    es: (Math.random() * 2000 - 1000).toFixed(4),
    stressVar: (Math.random() * 2000 - 1000).toFixed(4),
    stressEs: (Math.random() * 2000 - 1000).toFixed(4)
  }
})

export const retrospectiveOption = ['损益', 'VaR', 'ES', '压力VaR', '压力ES']
