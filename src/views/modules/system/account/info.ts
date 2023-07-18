import { UserInfo } from '#/store'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'userId',
    label: t('module.system.accountId'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'userName',
    label: t('module.system.userName'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'roles',
    type: 'array',
    label: t('module.system.role'),
    minWidth: 200,
    align: 'center'
  },
  {
    prop: 'department',
    label: t('module.system.department'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'position',
    label: t('module.system.position'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'email',
    label: t('module.system.mail'),
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'phone',
    label: t('module.system.phone'),
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'remarks',
    type: 'textarea',
    label: t('module.system.remarks'),
    minWidth: 210,
    align: 'center'
  }
]

export const userData: UserInfo[] = [
  {
    userId: '111a',
    userName: '赖奕博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '231',
    userName: '赖二博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '343',
    userName: '赖三博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '46464',
    userName: '赖四博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '7877',
    userName: '赖五博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '11090901a',
    userName: '赖六博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901',
    remarks: '撒旦撒大大撒撒的撒'
  }
]
