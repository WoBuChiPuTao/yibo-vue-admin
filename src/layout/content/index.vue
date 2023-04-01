<template>
  <div class="layout-content-cotainer" v-loading="getPageLoading">
    <router-view>
      <template #default="{ Component, route }">
        <Transition name="fade-slide" mode="out-in" appear>
          <KeepAlive :include="getCacheTabs">
            <component :is="Component" :key="route.fullPath"></component>
          </KeepAlive>
        </Transition>
      </template>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useOtherSetting } from '@/hooks/setting/useOtherSetting'
import { useTabStore } from '@/store/modules/tabs'
import { computed } from 'vue'
const tabStore = useTabStore()
// loading 在路由守卫修改状态
const { getPageLoading } = useOtherSetting()
// 只需要将tab还存在的alive
// 注意alive的组件名字必须要和getCacheTabs中的参数一样
const getCacheTabs = computed(() => tabStore.getCacheList)
</script>

<style lang="less" scoped>
.layout-content-cotainer {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
