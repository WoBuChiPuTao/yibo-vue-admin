<template>
  <div class="flex justify-around">
    <template v-for="item in items" :key="item.type">
      <div :class="['mode-item', `mode-item-${item.type}`]" @click="handleChange(item.type)"> </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { MenuTypeEnum } from '@/enums/configEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppStore } from '@/store/modules/app'
import { unref } from 'vue'

const items = [{ type: MenuTypeEnum.SIDE }, { type: MenuTypeEnum.TOP_MENU }]
const { getMenuType } = useMenuSetting()
const appStore = useAppStore()

function handleChange(type: MenuTypeEnum) {
  if (type === unref(getMenuType)) {
    return
  }
  appStore.setProjectSetting({ menuSetting: { type } })
}
</script>

<style lang="less" scoped>
.mode-item {
  position: relative;
  width: 56px;
  height: 48px;
  overflow: hidden;
  cursor: pointer;
  background-color: #f0f2f5;
  border-radius: 4px;

  &::before,
  &::after {
    position: absolute;
    content: '';
  }

  &-side {
    &::before {
      top: 0;
      left: 0;
      z-index: 1;
      width: 33%;
      height: 100%;
      background-color: #273352;
      border-radius: 4px 0 0 4px;
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
    }
  }

  &-top-menu {
    &::before {
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      z-index: 1;
      background-color: #273352;
    }
  }
}
</style>
