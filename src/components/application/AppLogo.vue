<template>
  <div class="flex items-center cursor-pointer justify-left" @click="goHome">
    <img class="w-8 h-8" src="../../assets/img/logo.png" />
    <h2 v-if="!getCollapsed" class="ml-5 font-bold truncate">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'

const { getCollapsed } = useMenuSetting()

const title = process.env.VUE_APP_SIMPLE_TITLE

const go = useGo()
function goHome() {
  go(PageEnum.BASE_HOME)
}
</script>
