import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export interface TreeSelectInfo {
  label: string
  value: string
  children: TreeSelectInfo[]
}
// table的列设置
export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'name',
    label: t('module.system.menuName'),
    minWidth: 180,
    align: 'left'
  },
  {
    prop: 'path',
    label: t('module.system.routePath'),
    minWidth: 150,
    align: 'center'
  },
  {
    prop: 'orderNo',
    label: t('module.system.weight'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'icon',
    label: t('module.system.icon'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'rights',
    label: t('module.system.button'),
    minWidth: 180,
    align: 'center'
  }
]
