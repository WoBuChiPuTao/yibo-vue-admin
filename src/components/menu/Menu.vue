<template>
  <ul class="menu-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Menu',
  setup() {
    return {}
  }
})
</script>

<style lang="less">
@import './menu.less';
</style>
