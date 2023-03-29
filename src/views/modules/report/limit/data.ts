import { LimitInfo } from './type'

export const limitData: LimitInfo[] = [...new Array(10)].map((_, index) => {
  const day = new Date(new Date().getTime() - index * 24 * 60 * 60 * 1000)
  return {
    date: day.toLocaleDateString().replace(/\//g, '-'),
    target: '市值',
    limit: 100000000,
    together: '总量',
    threshold: 90000000,
    useRate: Number((Math.random() * 1.5).toFixed(4)),
    lateExportTime: day.toLocaleDateString().replace(/\//g, '-'),
    maxExceed: Number((Math.random() * 500000 + 10050000).toFixed(0)),
    averageExceed: Number((Math.random() * 300 + 1004000).toFixed(0)),
    minExceed: Number((Math.random() * 4000 + 1000000).toFixed(0))
  }
})
