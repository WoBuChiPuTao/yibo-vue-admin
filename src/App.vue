<template>
  <ElConfigProvider :locale="getElLocale">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocale } from '@/locales/useLocale'
import 'dayjs/locale/zh-cn'
import { useHtmlTitle } from './hooks/web/useHtmlTitle'
const { getElLocale } = useLocale()

// 跟踪修改浏览器标题
useHtmlTitle()
</script>
