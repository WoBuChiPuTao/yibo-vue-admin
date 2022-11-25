<template>
  <ElContainer>
    <ElAside>
      <Side></Side>
    </ElAside>
    <ElContainer>
      <ElHeader></ElHeader>
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
</script>
