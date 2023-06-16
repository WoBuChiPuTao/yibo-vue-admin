import { FormRules } from 'element-plus'

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'instCode',
    label: '产品代码',
    minWidth: 120,
    align: 'center',
    notEdit: true
  },
  {
    prop: 'instName',
    label: '产品名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'bondType',
    label: '债券类型',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'marketType',
    label: '市场类型',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'market',
    label: '市场',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'marketCode',
    label: '市场代码',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'issuer',
    label: '发行人',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'issuingDate',
    label: '发行时间',
    minWidth: 120,
    align: 'center',
    type: 'date',
    format: 'YYYY-MM-DD'
  },
  {
    prop: 'issuePrice',
    type: 'number',
    label: '发行价格',
    minWidth: 120,
    align: 'center'
  },

  {
    prop: 'valueDate',
    label: '起息日',
    minWidth: 120,
    align: 'center',
    type: 'date',
    format: 'YYYY-MM-DD'
  },
  {
    prop: 'dueDate',
    label: '到期日',
    minWidth: 120,
    align: 'center',
    type: 'date',
    format: 'YYYY-MM-DD'
  },
  {
    prop: 'maturityPeriod',
    label: '到期期限',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'coupon',
    type: 'number',
    label: '票面利率',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'templateCode',
    label: '模板代码',
    minWidth: 120,
    align: 'center'
  }
]

export const rules: FormRules = {
  instCode: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  issuePrice: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { type: 'float', message: '请输入浮点数', trigger: 'blur' }
  ],
  coupon: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
}
