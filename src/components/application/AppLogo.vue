<template>
  <div class="flex items-center cursor-pointer justify-left" @click="goHome">
    <img class="logo-size" src="../../assets/img/logo.png" />
    <h2 v-if="!getCollapsed" class="ml-5 font-bold truncate">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'

const { getCollapsed } = useSiderSetting()

const title = process.env.VUE_APP_SIMPLE_TITLE

const go = useGo()
function goHome() {
  go(PageEnum.BASE_HOME)
}
</script>

<style lang="less" scoped>
.logo-size {
  height: @logo-width;
  width: @logo-width;
}
</style>
