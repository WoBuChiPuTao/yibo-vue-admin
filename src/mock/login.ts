import Mock from 'mockjs' // 引入mockjs
// import qs from 'qs'
import { Result, LoginRes, UserInfoRes } from '@/types'

const LoginBack: Result<LoginRes> = {
  code: 1,
  message: 'success',
  data: {
    token: '222222222'
  }
}

const userInfoBack: Result<UserInfoRes> = {
  code: 1,
  message: 'success',
  data: {
    id: '111111',
    username: 'nibaba',
    avatar: 'sssss',
    description: 'sb'
  }
}

Mock.mock('/user/login', 'post', (params) => {
  const queryString = params.body
  const queryObj = JSON.parse(queryString)
  console.log('queryObj', queryObj)
  if (queryObj.username === 'lyb01' && queryObj.password === '9TA5GD') {
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
