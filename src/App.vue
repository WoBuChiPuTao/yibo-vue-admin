<template>
  <AppProvider>
    <ElConfigProvider :locale="getElLocale">
      <router-view />
    </ElConfigProvider>
  </AppProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocale } from '@/locales/useLocale'
import 'dayjs/locale/zh-cn'
import { useHtmlTitle } from './hooks/web/useHtmlTitle'
import AppProvider from './components/application/AppProvider.vue'
const { getElLocale } = useLocale()

// 跟踪修改浏览器标题
useHtmlTitle()
</script>
