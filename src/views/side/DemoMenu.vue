<template>
  <ElMenu :collapse="isCollapse">
    <div>logo</div>
    <template v-for="item in items" :key="item.path">
      <SubMenu :item="item"></SubMenu>
    </template>
  </ElMenu>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ElMenu } from 'element-plus'
import SubMenu from '@/components/menu/SubMenu.vue'
import { SimpleMenu } from '@/types/menu'

export default defineComponent({
  name: 'DemoMenu',
  components: { ElMenu, SubMenu },
  props: {
    items: {
      type: Array as PropType<SimpleMenu[]>,
      default: () => []
    }
  },
  setup() {
    const isCollapse = ref(false)
    return {
      isCollapse
    }
  }
})
</script>

<style lang="less"></style>
