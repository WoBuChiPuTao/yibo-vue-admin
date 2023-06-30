import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { Result } from '@/utils/axios/types'
import { LoginRes } from '#/api'
import { UserInfo } from '#/store'
import { Menu } from '#/list'
import { t } from '@/hooks/web/useI18n'

const domain = '/api'

const LoginBack: Result<LoginRes> = {
  code: 200,
  message: 'success',
  data: {
    token: '6666aaa66666',
    role: {
      roleName: '老总',
      value: 'super'
    }
  }
}

const userInfoBack: Result<UserInfo> = {
  code: 200,
  message: 'success',
  data: {
    userId: '111111',
    username: 'yibo Admin',
    avatar: undefined,
    desc: 'sb',
    realName: 'SB',
    roles: [
      {
        roleName: '老总',
        value: 'super'
      },
      {
        roleName: '测试',
        value: 'test'
      }
    ]
  }
}

Mock.mock(`${domain}/user/login`, 'post', (params) => {
  const queryString = params.body
  const queryObj = JSON.parse(queryString)
  if (queryObj.username === 'lyb01' && queryObj.password === '123') {
    LoginBack.data.role.roleName = queryObj.username
    return LoginBack
  } else {
    return {
      code: 500,
      data: null,
      message: '账户或密码错误'
    }
  }
})

Mock.mock(`${domain}/user/info`, 'get', () => {
  return userInfoBack
})

Mock.mock(`${domain}/user/menu`, 'post', ({ body }): Result<Menu[]> => {
  const { role } = JSON.parse(body) as { role: string }
  if (role === 'super') {
    return {
      code: 200,
      message: 'aaaa',
      data: [
        {
          path: '/home',
          routeName: 'Home',
          name: t('routes.home.home'),
          orderNo: 1,
          icon: 'material-symbols:home-outline',
          children: [
            {
              path: 'dashboard',
              routeName: 'Dashboard',
              name: t('routes.home.dashboard')
            },
            {
              path: 'workbench',
              routeName: 'Workbench',
              name: t('routes.home.workbench')
            }
          ]
        }
      ]
    }
  } else {
    return {
      code: 200,
      message: '2222',
      data: [
        {
          path: '/home',
          routeName: 'Home',
          name: t('routes.home.home'),
          orderNo: 1,
          icon: 'material-symbols:home-outline',
          children: [
            {
              path: 'dashboard',
              routeName: 'Dashboard',
              name: t('routes.home.dashboard'),
              rights: [{ id: 'www', name: '新增' }]
            }
          ]
        }
      ]
    }
  }
})
