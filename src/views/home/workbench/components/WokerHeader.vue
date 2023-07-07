<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <ElAvatar :src="avatar || HeaderImg" :size="72"></ElAvatar>
      <h3 class="ml-4 text-xl font-medium"
        >{{ t('sys.login.loginSuccessDesc') }} , {{ userName }}</h3
      >
    </div>
    <div class="flex">
      <div class="flex flex-col items-end justify-around">
        <span class="text-sm text-sub">代办</span>
        <span class="text-2xl">4</span>
      </div>
      <div class="flex flex-col items-end justify-around mx-10 md:mx-16">
        <span class="text-sm text-sub">项目</span>
        <span class="text-2xl">5</span>
      </div>
      <div class="flex flex-col items-end justify-around">
        <span class="text-sm text-sub">团队</span>
        <span class="text-2xl">6</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { ElAvatar } from 'element-plus'
import HeaderImg from '@/assets/img/avatar.jpg'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const userStore = useUserStore()

const { userName, avatar } = userStore.getUserInfo
</script>
