<template>
  <div style="height: 80px;"></div>
  <div class="header-fixed">
    <LayoutHeader></LayoutHeader>
    <Tabs></Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import Tabs from '@/components/tabs/index.vue'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader, Tabs },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.header-fixed {
  position: fixed;
  top: 0;
  width: calc(100% - 210px);
  z-index: 505;
}
</style>
