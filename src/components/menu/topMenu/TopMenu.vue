<template>
  <ElMenu mode="horizontal" router :default-active="currentRoute.path">
    <template v-for="items in props.menus" :key="items.path">
      <TopMenuItem :parent="true" :menu="items"></TopMenuItem>
    </template>
  </ElMenu>
</template>

<script setup lang="ts">
import { Menu } from '#/list'
import { ElMenu } from 'element-plus'
import { PropType } from 'vue'
import { useRouter } from 'vue-router'
import TopMenuItem from './TopMenuItem.vue'

const props = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    default: () => []
  }
})

const { currentRoute } = useRouter()
</script>

<style lang="less">
.el-menu--horizontal {
  border: 0;
}
</style>
