<template>
  <ElRow :gutter="24">
    <ElCol :span="12" class="i-enter-x">
      <Card>
        <template #header>
          <span>回溯曲线</span>
        </template>
        <RetrospectiveTable></RetrospectiveTable>
      </Card>
    </ElCol>
    <ElCol :span="12" class="enter-y">
      <Card>
        <template #header>
          <span>回溯数据</span>
        </template>
        <RetrospectiveTable></RetrospectiveTable>
      </Card>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import Card from '@/components/card/Card.vue'
import RetrospectiveTable from './RetrospectiveTable.vue'
</script>
