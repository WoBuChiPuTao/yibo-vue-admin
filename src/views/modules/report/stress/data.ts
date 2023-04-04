export const stressTableData = [
  {
    name: 'FICC',
    present: 1400000,
    income: 1300,
    children: [
      {
        name: '固收',
        present: 80000,
        income: 750,
        children: [
          {
            name: '债券',
            present: 50000,
            income: 400
          },
          {
            name: '同业拆借',
            present: 5000,
            income: 50
          },
          {
            name: '利率衍生品',
            present: 25000,
            income: 300
          }
        ]
      },
      {
        name: '外汇',
        present: 60000,
        income: 550,
        children: [
          {
            name: '外汇远期',
            present: 30000,
            income: 150
          },
          {
            name: '外汇不可交割远期',
            present: 10000,
            income: 200
          },
          {
            name: '外汇掉期',
            present: 20000,
            income: 300
          }
        ]
      }
    ]
  }
]
