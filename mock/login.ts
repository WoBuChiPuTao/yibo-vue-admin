import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { Result } from '@/utils/axios/types'
import { LoginRes } from '#/api'
import { UserInfo } from '#/store'

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
      code: 0,
      message: '账户或密码错误'
    }
  }
})

Mock.mock(`${domain}/user/info`, 'get', () => {
  return userInfoBack
})
