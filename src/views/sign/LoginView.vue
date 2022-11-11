<template>
  <div class="container">
    <form action="" method="get">
      <h2>登录</h2>
      <div class="input-div name">
        <div class="tip">
          <h5>账户</h5>
        </div>
        <div class="div">
          <input type="text" class="input" name="username" />
        </div>
      </div>
      <div class="input-div pass">
        <div class="tip">
          <h5>密码</h5>
        </div>
        <div class="div">
          <input type="password" class="input" name="password" />
        </div>
        <router-link to="/register"></router-link>
        <button type="submit" class="btn" @click="getExcel()">登录</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Axios from '@/utils/axios'
function getExcel(): unknown {
  return Axios.post('/dqengine-ir/hist/ibor/export', {
    asOfDate: '2022-01-04 00:00:00',
    instCode: 'FR_001',
    cursor: '0',
    pageSize: 10,
    term: '1D'
  })
}
</script>

<script lang="ts">
export default {
  name: 'LoginView'
}
</script>

<style lang="less" scoped></style>
