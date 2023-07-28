<template>
  <div class="flex items-center cursor-pointer justify-left logo-contianer" @click="goHome">
    <img class="logo-size" src="../../assets/img/logo.jpg" />
    <h2 v-show="props.showText" class="ml-5 font-bold truncate logo-title">{{ title }}</h2>
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
.logo {
  &-contianer {
    transition: all 0.2s ease;
  }
  &-size {
    height: @logo-width;
    width: @logo-width;
  }

  &-title {
    transition: all 0.5s;
  }
}
</style>
