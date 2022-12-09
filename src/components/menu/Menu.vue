<template>
  <ul class="menu-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createRootMenuContext } from './useMenuContext'
import mitt from '@/utils/mitt'

export default defineComponent({
  name: 'Menu',
  setup() {
    const rootMenuEmitter = mitt()
    createRootMenuContext({
      rootMenuEmitter: rootMenuEmitter
    })
    return {}
  }
})
</script>

<style lang="less">
@import './menu.less';
</style>
