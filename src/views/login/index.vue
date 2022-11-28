<template>
  <div class="body">
    <img src="/resource/img/bg.jpeg" alt="" class="bg" />
    <div class="container">
      <div class="cover-box"></div>
      <RegisterForm></RegisterForm>
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
// import { reactive } from 'vue'
// import { useRouter } from 'vue-router'
// import { ElForm, ElButton, ElInput, ElFormItem } from 'element-plus'
// import { login } from '@/api/login'
// import '@/mock/login'

// const router = useRouter()

// const loginData = reactive({
//   username: '',
//   password: ''
// })

// const getUSerInfo = async () => {
//   const resData = await getUserInfo()
//     .then((res) => {
//       router.replace(`/home/${res.id}/${res.username}`)
//       return res
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   console.log(resData)
// }

// async function handlerLogin() {
//   const resData = await login(loginData)
//     .then((res) => {
//       router.push('/home')
//       return res
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   console.log(resData)
// }
</script>

<style lang="less">
.body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  bottom: 0;
  left: 0;
}

.container {
  width: 650px;
  height: 450px;
  position: relative;
  background-color: #fff;
  display: flex;
  border-radius: 5px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);

  .cover-box {
    position: absolute;
    top: -5%;
    left: 5%;
    width: 320px;
    height: 500px;
    background-color: aqua;
    z-index: 3;
    // visibility: hidden;
  }
}
</style>
