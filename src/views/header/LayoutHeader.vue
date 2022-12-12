<template>
  <ElHeader class="header">
      <div class="header-left">
        <div>关闭侧边栏</div>
        <div>面包屑</div>
      </div>

      <div class="header-action">
        <div>搜索</div>
        <div>通知</div>
        <div>全屏</div>
        <div>用户下拉框</div>
        <div>设置</div>
      </div>
  </ElHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElHeader } from 'element-plus'

export default defineComponent({
  name: 'layoutHeader',
  components: { ElHeader },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import './header.less';

</style>
