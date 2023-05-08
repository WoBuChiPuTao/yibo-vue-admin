<template>
  <div class="flex items-center cursor-pointer justify-left" @click="goHome">
    <img class="logo-size" src="../../assets/img/logo.jpg" />
    <h2 v-show="props.showText" class="ml-5 font-bold truncate">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'

const props = defineProps({
  showText: {
    type: Boolean,
    default: true
  }
})

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
