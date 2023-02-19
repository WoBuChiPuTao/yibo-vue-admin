<template>
  <ElContainer>
    <ElAside class="sider">
      <Side></Side>
    </ElAside>
    <ElContainer class="layout-main">
      <Header></Header>
      <ElMain class="layout-main-content">
        <router-view></router-view>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElMain } from 'element-plus'
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
  display: flex;
  flex: auto;
  flex-direction: column;
  //background: #f0f2f5;

  &-content{
    padding: 0;
  }
}
</style>
