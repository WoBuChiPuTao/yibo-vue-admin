<template>
  <div class="color-list">
    <template v-for="item in props.colorList" :key="item.key">
      <div
        :class="['color-list-item', { 'color-list-item-active': item.theme === activedTheme }]"
        :style="{ backgroundColor: item.theme }"
        @click="handleCilck(item)"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ColorSetting } from '#/config'

const props = defineProps({
  colorList: {
    type: Array as PropType<ColorSetting<any>[]>,
    default: () => []
  },
  activedTheme: String
})

const emits = defineEmits(['clickColor'])

function handleCilck(color: ColorSetting<any>) {
  emits('clickColor', color)
}
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
    border: 1px solid #a7a7a7;

    &:hover,
    &-active {
      border-color: #006df3;
    }
  }
}
</style>
