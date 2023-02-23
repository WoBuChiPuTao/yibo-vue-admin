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
const getCacheTabs = computed(() => tabStore.getCacheList)
</script>
