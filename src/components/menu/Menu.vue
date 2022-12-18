<template>
  <ul class="menu-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { createRootMenuContext } from './useMenuContext'
import mitt, { Emitter } from '@/utils/mitt'

export default defineComponent({
  name: 'Menu',
  emits: ['selectMenuItem'],
  setup(props, { emit }) {
    const currentSelectedName = ref('')
    const rootMenuEmitter: Emitter<Record<string, any>> = mitt()
    createRootMenuContext({
      rootMenuEmitter: rootMenuEmitter,
      selectedName: currentSelectedName
    })
    onMounted(() => {
      rootMenuEmitter.on('menu-item-selected', (name: string): void => {
        currentSelectedName.value = name
        emit('selectMenuItem', name)
      })
    })
    return {}
  }
})
</script>

<style lang="less">
@import './menu.less';
</style>
