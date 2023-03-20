<template>
  <div v-if="themeMode" :class="getClass" @click="toggleThemeMode">
    <div class="theme-toggle-container-inner"></div>
    <SvgIcon class="mr-1 text-xs" name="sun-regular" />
    <SvgIcon class="text-xs" name="moon-regular" />
  </div>
  <div v-else @click="toggleThemeMode">
    <SvgIcon v-if="isDarked" size="20" name="sun-regular" />
    <SvgIcon v-else size="20" name="moon-regular" />
  </div>
</template>

<script setup lang="ts">
import { useThemeMode, updateHtmlTheme } from '@/hooks/setting/useTheme'
import { ThemeEnum } from '@/enums/appEnum'
import { computed, PropType } from 'vue'
import SvgIcon from '../icons/SvgIcon.vue'

const { getThemeMode, setThemeMode } = useThemeMode()

const props = defineProps({
  mode: {
    type: String as PropType<'switch' | 'icon'>,
    default: 'switch'
  }
})

const themeMode = props.mode === 'switch'

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
  const theme = getThemeMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
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
  border: 1px solid #fff;

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
