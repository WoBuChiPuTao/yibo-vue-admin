<template>
  <ElConfigProvider :locale="getElLocale">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocale } from '@/locales/useLocale'
import 'dayjs/locale/zh-cn'
const { getElLocale } = useLocale()
</script>
