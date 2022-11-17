<template>
  <img src="/resource/img/bg.jpeg" alt="" class="bg" />
  <div class="container">
    <div class="login-content">
      <ElForm :model="loginData" label-width="auto">
        <ElFormItem class="avatar">
          <img src="" alt="" />
        </ElFormItem>
        <ElFormItem label="账户">
          <ElInput v-model="loginData.username" type="text"> </ElInput>
        </ElFormItem>
        <ElFormItem label="密码">
          <ElInput v-model="loginData.password" type="password"> </ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="getUSerInfo">登录</ElButton>
        </ElFormItem>
        <ElFormItem>
          <a href="">注册账号</a>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElButton, ElInput, ElFormItem } from 'element-plus'
import { login, getUserInfo } from '@/api/login'
import '@/mock/login'

const router = useRouter()

const loginData = reactive({
  username: '',
  password: ''
})

const getUSerInfo = async () => {
  const resData = await getUserInfo()
    .then((res) => {
      router.replace(`/home/${res.id}/${res.username}`)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(resData)
}

async function handlerLogin() {
  const resData = await login(loginData)
    .then((res) => {
      router.push('/home')
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(resData)
}
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  bottom: 0;
  left: 0;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
