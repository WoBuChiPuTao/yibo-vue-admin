<template>
  <div class="container">
    <ElButton type="primary" class="btn" @click="getApi">登录</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { http } from '@/utils/axios'
const obj = {
  account: 'xiaotuxian001',
  password: '123456'
}

function getApi() {
  http
    .post('login', obj)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="less" scoped></style>
