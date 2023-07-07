import { UserInfo } from '#/store'

export interface AddUserInfo extends UserInfo {
  roles: string[]
}

export const columnsInfo: TableColumnInfo[] = [
  {
    prop: 'userName',
    label: '名称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'alias',
    label: '昵称',
    minWidth: 120,
    align: 'center'
  },
  {
    prop: 'roles',
    type: 'array',
    label: '角色',
    minWidth: 200,
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
  },
  {
    prop: 'remarks',
    type: 'textarea',
    label: '备注',
    minWidth: 210,
    align: 'center'
  }
]

export const userData: AddUserInfo[] = [
  {
    userId: '111a',
    userName: '赖奕博',
    alias: 'hahaha',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '231',
    userName: '赖二博',
    alias: '赖二博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '343',
    userName: '赖三博',
    alias: '赖三博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '46464',
    userName: '赖四博',
    alias: '赖四博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '7877',
    userName: '赖五博',
    alias: '赖五博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901'
  },
  {
    userId: '11090901a',
    userName: '赖六博',
    alias: '赖六博',
    roles: ['111', '2222', '3333'],
    department: '软件开发部',
    position: '开发',
    email: '1234654879@qq.com',
    phone: '12345678901',
    remarks: '撒旦撒大大撒撒的撒'
  }
]
