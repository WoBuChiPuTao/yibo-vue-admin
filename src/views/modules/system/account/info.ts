export interface UserInfo {
  id: string
  name: string
  alias: string
  roles: string[]
  department: string
  position: string
  email: string
  phone: string
}

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'alias',
    label: '别名',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'roles',
    type: 'array',
    label: '角色',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'department',
    label: '部门',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'position',
    label: '职位',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: 180,
    align: 'center'
  },
  {
    prop: 'phone',
    label: '电话',
    minWidth: 120,
    align: 'center'
  }
]

export const userData: UserInfo[] = [
  {
    id: '12121212',
    name: '111a',
    alias: '赖奕博',
    roles: ['超级管理员', '老总'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    id: '321313',
    name: '231',
    alias: '赖二博',
    roles: ['超级管理员', '老总', '测试'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    id: '43434',
    name: '343',
    alias: '赖三博',
    roles: ['超级管理员', '老总'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    id: '6546464',
    name: '46464',
    alias: '赖四博',
    roles: ['超级管理员', '老总'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    id: '89787878',
    name: '7877',
    alias: '赖五博',
    roles: ['超级管理员', '老总'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    id: '990909',
    name: '11090901a',
    alias: '赖六博',
    roles: ['超级管理员', '老总'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  }
]
