<template>
  <div class="color-list">
    <template v-for="item in props.colorList" :key="item.theme">
      <div
        :class="['color-list-item', { 'color-list-item-active': item.theme === activedTheme }]"
        @click="handleCilck(item)"
      >
        <div :style="{ height: '100%', backgroundColor: item.theme }"></div>
      </div>
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
    padding: 0.25rem 0.25rem;
    margin: 0.25rem 0.25rem;
    border: 1px solid #a7a7a7;

    &:hover,
    &-active {
      border-color: var(--el-color-primary);
    }
  }
}
</style>
