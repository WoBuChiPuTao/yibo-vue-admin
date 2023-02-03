<template>
  <ElContainer>
    <ElAside class="sider">
      <Side></Side>
    </ElAside>
    <ElContainer>
      <Header></Header>
      <ElMain>
        <router-view></router-view>
      </ElMain>
      <ElFooter></ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElFooter, ElMain } from 'element-plus'
import Header from '@/views/layout/header/index.vue'
import Side from '@/views/layout/side/index.vue'
</script>

<style lang="less">
.sider {
  height: 100vh;
  width: 210px;
  background-color: #001529;
  overflow: hidden;
}
</style>
