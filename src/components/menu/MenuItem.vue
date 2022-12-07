<template>
  <li class="menu-list-item" :style="getItemStyle">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { useMenuItem } from './useMenu'

export default defineComponent({
  name: 'MenuItem',
  setup() {
    const instance = getCurrentInstance()
    const { getItemStyle } = useMenuItem(instance)
    return {
      getItemStyle
    }
  }
})
</script>
