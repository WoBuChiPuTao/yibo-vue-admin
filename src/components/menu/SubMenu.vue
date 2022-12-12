<template>
  <SubMenuItem v-if="hasChildrenMenu(item)" :class="getLevelClass">
    <template #title>
      <EIcon class="iconfont" :icon="item.icon"></EIcon>
      <span class="item-name"> {{ item.name }}</span>
    </template>
    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <SubMenu :item="childrenItem"></SubMenu>
    </template>
  </SubMenuItem>
  <MenuItem v-else :class="getLevelClass">
    <EIcon class="iconfont" :icon="item.icon"></EIcon>
    <span class="item-name">{{ item.name }}</span>
  </MenuItem>
</template>

<script lang="ts">
import { SimpleMenu } from '@/types/menu'
import { computed, defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'
import EIcon from '@/components/icons/EIcon.vue'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, EIcon, SubMenuItem },
  props: {
    item: {
      type: Object as PropType<SimpleMenu>,
      default: () => ({})
    },
    parent: Boolean
  },
  setup(props) {
    // 菜单层次样式
    const getLevelClass = computed(() => {
      return [
        {
          'menu-parent': props.parent,
          'menu-children': !props.parent
        }
      ]
    })

    function hasChildrenMenu(item: SimpleMenu): boolean {
      if (item.children) {
        return true
      } else {
        return false
      }
    }
    return {
      hasChildrenMenu,
      getLevelClass
    }
  }
})
</script>
