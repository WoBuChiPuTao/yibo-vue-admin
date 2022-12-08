<template>
  <li :class="getClass">
    <div class="menu-list-item" @click.stop="handleClick" :style="getItemStyle">
      <slot name="title"></slot>
      <EIcon icon="eva:arrow-ios-downward-outline" class="submenu-open-icon" />
    </div>
    <CollapseTransition>
      <ul v-show="opened">
        <slot></slot>
      </ul>
    </CollapseTransition>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs
} from 'vue'
import { useMenuItem } from './useMenu'
import EIcon from '@/components/icons/EIcon.vue'
import CollapseTransition from '@/components/Transition/CollapseTransition.vue'

export default defineComponent({
  name: 'SubMenuItem',
  components: { EIcon, CollapseTransition },
  setup() {
    // 多级菜单样式
    const instance = getCurrentInstance()
    const { getItemStyle } = useMenuItem(instance)

    // 打开下级菜单
    function handleClick() {
      const opened = state.opened
      state.opened = !opened
    }

    const state = reactive({
      opened: false
    })

    const getClass = computed(() => {
      return [
        {
          'menu-list-item-opend': state.opened
        }
      ]
    })
    return {
      getItemStyle,
      getClass,
      handleClick,
      ...toRefs(state)
    }
  }
})
</script>
