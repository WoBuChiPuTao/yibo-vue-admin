<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex flex-col items-center justify-center w-1/2 h-1/2">
      <SvgIcon class="w-full h-full" name="403"></SvgIcon>
      <ElButton type="primary" @click="handleClick">{{ t('sys.exception.backHome') }}</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useGo } from '@/hooks/web/usePage'

const go = useGo()

const { t } = useI18n()

function handleClick() {
  go('/', true)
}
</script>
