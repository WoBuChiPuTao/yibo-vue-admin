import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { LoginRes, UserInfoRes } from '@/types/user'
import { Result } from '@/utils/axios/types'

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

const userInfoBack: Result<UserInfoRes> = {
  code: 200,
  message: 'success',
  data: {
    userId: '111111',
    username: 'nibaba',
    avatar: '',
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

Mock.mock('/user/login', 'post', (params) => {
  const queryString = params.body
  const queryObj = JSON.parse(queryString)
  if (queryObj.username === 'lyb01' && queryObj.password === '123') {
    return LoginBack
  } else {
    return {
      code: 0,
      message: '账户或密码错误'
    }
  }
})

Mock.mock('/user/info', 'get', () => {
  return userInfoBack
})
