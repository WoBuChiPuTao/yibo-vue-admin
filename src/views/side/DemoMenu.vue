<template>
  <div>logo</div>
  <ElMenu>
    <template>
      <MenuItem></MenuItem>
    </template>
  </ElMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMenu } from 'element-plus'
import MenuItem from './MenuItem.vue'

export default defineComponent({
  name: 'DemoMenu',
  components: { ElMenu, MenuItem },
  setup() {
    return {}
  }
})
</script>
