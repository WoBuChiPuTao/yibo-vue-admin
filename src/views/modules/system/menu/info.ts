export interface TreeSelectInfo {
  label: string
  value: string
  children: TreeSelectInfo[]
}
// table的列设置
export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 180,
    align: 'left'
  },
  {
    prop: 'path',
    label: '路径',
    minWidth: 150,
    align: 'center'
  },
  {
    prop: 'orderNo',
    label: '权重',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'icon',
    label: '图案',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'rights',
    label: '按钮',
    minWidth: 180,
    align: 'center'
  }
]
