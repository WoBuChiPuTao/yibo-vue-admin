export const portfolioData = [
  {
    name: 'XX组合0',
    present: Number((Math.random() * 10000 + 10000).toFixed(4)),
    var: Number((Math.random() * 200).toFixed(4)),
    es: Number((Math.random() * -300).toFixed(4)),
    stressVar: Number((Math.random() * 200).toFixed(4)),
    stressEs: Number((Math.random() * -300).toFixed(4))
  }
]

for (let i = 1; i < 7; i++) {
  portfolioData.push({
    name: 'XX组合' + i,
    present: Number((Math.random() * 10000 + 10000).toFixed(4)),
    var: Number((Math.random() * 200).toFixed(4)),
    es: Number((Math.random() * -300).toFixed(4)),
    stressVar: Number((Math.random() * 200).toFixed(4)),
    stressEs: Number((Math.random() * -300).toFixed(4))
  })
}
