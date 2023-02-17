<template>
  <ElContainer>
    <ElAside class="sider">
      <Side></Side>
    </ElAside>
    <ElContainer>
      <Header></Header>
      <ElMain class="layout-main">
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
  overflow: hidden;
}

.layout-main {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
}
</style>
