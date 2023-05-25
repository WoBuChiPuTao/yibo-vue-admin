<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col flex-1 p-4 m-4 basic-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.basic-container {
  background-color: var(--el-bg-color);
}
</style>
