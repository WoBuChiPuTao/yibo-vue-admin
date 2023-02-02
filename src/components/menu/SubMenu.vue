<template>
  <SubMenuItem v-if="hasChildrenMenu(item)" :class="getLevelClass" :name="item.path">
    <template #title>
      <EIcon v-if="getCeil" class="menu-list-item-iconfont" :icon="item.icon"></EIcon>
      <span class="menu-list-item-name"> {{ item.name }}</span>
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
  </SubMenuItem>
  <MenuItem v-else :class="getLevelClass" :name="item.path">
  <EIcon v-if="getCeil" class="menu-list-item-iconfont" :icon="item.icon"></EIcon>
  <span class="menu-list-item-name">{{ item.name }}</span>
  </MenuItem>
</template>

<script lang="ts">
import { Menu } from '@/types/menu'
import { computed, defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'
import EIcon from '@/components/icons/EIcon.vue'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, EIcon, SubMenuItem },
  props: {
    item: {
      type: Object as PropType<Menu>,
      default: () => ({})
    },
    parent: Boolean
  },
  setup(props) {
    // 是否为顶层
    const getCeil = computed(() => {
      return !!props.parent
    })
    // 菜单层次样式
    const getLevelClass = computed(() => {
      return [
        {
          'menu-parent': props.parent,
          'menu-children': !props.parent
        }
      ]
    })

    function hasChildrenMenu(item: Menu): boolean {
      if (item.children && item.children.length > 0) {
        return true
      } else {
        return false
      }
    }
    return {
      hasChildrenMenu,
      getLevelClass,
      getCeil
    }
  }
})
</script>
