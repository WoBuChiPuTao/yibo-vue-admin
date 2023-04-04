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

export const xAxis: string[] = []
const baseDate = +new Date(2019, 1, 5)
for (let i = 0; i < 1e3; i++) {
  const date = new Date(baseDate + i * 24 * 3600 * 1000)
  xAxis.push(date.toLocaleDateString().replace(/\//g, '-'))
}

export const barData: number[] = []
export const lineData: number[] = []
export const mirrorLineData: number[] = []
let lineBase = Number((Math.random() * 200).toFixed(1))
let barBase = 0
for (let i = 0; i < 1e3; i++) {
  barBase = Number((barBase + Math.random() * 5 - 2.5).toFixed(0))
  lineBase = Math.max(50, Number((lineBase + Math.random() * 5 - 2.5).toFixed(0)))
  barData.push(i % 150 === 0 ? (i % 200 === 0 ? -lineBase - 1 : lineBase + 1) : barBase)

  lineData.push(lineBase)
  mirrorLineData.push(-lineBase)
}
