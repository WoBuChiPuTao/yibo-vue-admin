<template>
  <div :class="getClass" @click="toggleThemeMode">
    <div class="theme-toggle-container-inner"></div>
    <SvgIcon size="14" name="sun-regular" />
    <SvgIcon size="14" name="moon-regular" />
  </div>
</template>

<script setup lang="ts">
import { useThemeMode, updateHtmlTheme } from '@/hooks/setting/useTheme'
import { ThemeEnum } from '@/types/enums/appEnum'
import { computed } from 'vue'
import SvgIcon from '../icons/SvgIcon.vue'

const { getThemeMode, setThemeMode } = useThemeMode()

const isDarked = computed(() => {
  return getThemeMode.value === ThemeEnum.DARK
})

const getClass = computed(() => {
  return [
    'theme-toggle-container',
    {
      'theme-toggle-container-dark': isDarked.value
    }
  ]
})

function toggleThemeMode() {
  const theme =
    getThemeMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  setThemeMode(theme)
  updateHtmlTheme(theme)
}
</script>

<style lang="less">
.theme-toggle-container {
  position: relative;
  display: flex;
  width: 52px;
  height: 28px;
  padding: 0 6px;
  margin-left: auto;
  cursor: pointer;
  background-color: #151515;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border: 2px solid #fff;

  &-inner {
    position: absolute;
    left: 4px;
    z-index: 1;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.5s, background-color 0.5s;
    will-change: transform;
  }
  &-dark > &-inner {
    transform: translateX(calc(100% + 5px));
  }
}
</style>
