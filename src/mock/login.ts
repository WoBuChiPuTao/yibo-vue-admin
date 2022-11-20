import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { LoginRes, UserInfoRes } from '@/types/user'
import { Result } from '@/utils/axios/types'

const LoginBack: Result<LoginRes> = {
  code: 1,
  message: 'success',
  data: {
    token: '666666666',
    role: {
      roleName: '老总',
      value: 'super'
    }
  }
}

const userInfoBack: Result<UserInfoRes> = {
  code: 1,
  message: 'success',
  data: {
    userId: '111111',
    username: 'nibaba',
    avatar: 'sssss',
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
  console.log('queryObj', queryObj)
  if (queryObj.username === 'lyb01' && queryObj.password === '123') {
    return LoginBack
  } else {
    LoginBack.code = 0
    LoginBack.message = 'sb'
    return LoginBack
  }
})

Mock.mock('/user/info', 'get', () => {
  return userInfoBack
})
