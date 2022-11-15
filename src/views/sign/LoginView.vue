<template>
  <div class="container">
    <ElButton type="primary" class="btn" @click="getFile">下载</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { http } from '@/utils/axios'
const obj = {
  asOfDate: '2022-01-04 00:00:00',
  cursor: '0',
  instCode: 'FR_001',
  pageSize: 10
}

function getFile() {
  http
    .post('/dqengine-ir/hist/ibor/export', obj, {
      responseType: 'arraybuffer'
    })
    .then((res) => {
      console.log(res)
      const blob = new Blob([res as string], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      })
      const a = document.createElement('a')
      a.setAttribute('download', 'aaaa')
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="less" scoped></style>
