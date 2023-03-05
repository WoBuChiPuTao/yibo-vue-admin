<template>
  <router-view>
    <template #default="{ Component, route }">
      <Transition name="fade-slide" mode="out-in" appear>
        <KeepAlive :include="getCacheTabs">
          <component :is="Component" :key="route.fullPath"></component>
        </KeepAlive>
      </Transition>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store/modules/tabs'
import { computed } from 'vue'
const tabStore = useTabStore()
// 只需要将tab还存在的alive
// 注意alive的组件名字必须要和getCacheTabs中的参数一样
const getCacheTabs = computed(() => tabStore.getCacheList)
</script>
