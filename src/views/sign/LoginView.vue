<template>
  <div class="container">
    <ElForm :model="loginData" label-width="120px">
      <ElFormItem label="用户名">
        <ElInput v-model="loginData.username" type="text"> </ElInput>
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput v-model="loginData.password" type="password"> </ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="getUSerInfo">登录</ElButton>
      </ElFormItem>
    </ElForm>
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
      router.push(`/home/${res.id}/${res.username}`)
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
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
