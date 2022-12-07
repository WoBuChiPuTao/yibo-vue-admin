<template>
  <li>
    <div class="menu-list-item" @click.stop="handleClick" :style="getItemStyle">
      <slot name="title"></slot>
      <EIcon icon="eva:arrow-ios-downward-outline" class="submenu-open-icon" />
    </div>
    <ul v-show="opened">
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
import { useMenuItem } from './useMenu'
import EIcon from '@/components/icons/EIcon.vue'

export default defineComponent({
  name: 'SubMenuItem',
  components: { EIcon },
  setup() {
    // 多级菜单样式
    const instance = getCurrentInstance()
    const { getItemStyle } = useMenuItem(instance)

    function handleClick() {
      const opened = state.opened
      state.opened = !opened
    }

    const state = reactive({
      opened: false
    })
    return {
      getItemStyle,
      handleClick,
      ...toRefs(state)
    }
  }
})
</script>
