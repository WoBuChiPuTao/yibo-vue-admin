<template>
  <ElContainer>
    <ElAside class="sider">
      <Side></Side>
    </ElAside>
    <ElContainer>
      <ElHeader class="header"></ElHeader>
      <ElMain>
        <router-view></router-view>
      </ElMain>
      <ElFooter></ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElHeader, ElFooter, ElMain } from 'element-plus'
import Side from '@/views/side/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

console.log('currentRoute ', router.getRoutes())
</script>

<style lang="less" scoped>
.sider {
  width: 200px;
}
</style>
