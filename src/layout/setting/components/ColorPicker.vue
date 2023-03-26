<template>
  <div class="color-list">
    <template v-for="item in props.colorList" :key="item">
      <div class="color-list-item" :style="{ backgroundColor: item }"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  actived: String
})
</script>

<style lang="less" scoped>
.color-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 1rem 0;

  &-item {
    height: 1.5rem;
    width: 1.5rem;
    margin: 0.5rem 0.5rem;
  }
}
</style>
