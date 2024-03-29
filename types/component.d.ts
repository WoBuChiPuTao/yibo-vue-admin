type FormItemRule = import('element-plus').FormItemRule

declare type ColumnItemType = 'date' | 'datetime' | 'string' | 'number' | 'array' | 'textarea'

declare interface TableColumnInfo {
  type?: ColumnItemType
  format?: string // 只有type为时间格式才生效
  align?: 'left' | 'center' | 'right'
  prop: string
  label: string
  labelWidth?: string | number
  minWidth?: number
  fixed?: 'left' | 'right'
  notEdit?: boolean
  disabled?: boolean
  rules?: FormItemRule | FormItemRule[]
}

declare type CruEventType = 'view' | 'create' | 'update'
