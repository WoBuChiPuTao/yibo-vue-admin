<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import Card from '@/components/card/Card.vue'
import EIcon from '@/components/icons/EIcon.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import logosVue from '@iconify-icons/logos/vue'
import logosReact from '@iconify-icons/logos/react'
import nuxtIcon from '@iconify-icons/logos/nuxt-icon'
import logosNextjs from '@iconify-icons/logos/nextjs-icon'
import NumberTransition from '@/components/Transition/NumberTransition.vue'

const props = defineProps({
  skeletonLoading: Boolean
})

const cardList = [
  {
    title: 'Vue',
    icon: { name: 'logos:vue', entity: logosVue },
    growth: 1111,
    totalTitle: 'Total visits',
    total: 99999
  },
  {
    title: 'React',
    icon: { name: 'logos:react', entity: logosReact },
    growth: 22222,
    totalTitle: 'Total visits',
    total: 999999
  },
  {
    title: 'Nuxt',
    icon: { name: 'logos:nuxt-icon', entity: nuxtIcon },
    growth: 333333,
    totalTitle: 'Total visits',
    total: 9999999
  },
  {
    title: 'Nest',
    icon: { name: 'logos:nextjs-icon', entity: logosNextjs },
    growth: 444444,
    totalTitle: 'Total visits',
    total: 99999999
  }
]
</script>

<template>
  <el-row :gutter="16">
    <template v-for="item in cardList" :key="item.title">
      <el-col :span="6">
        <Card :loading="props.skeletonLoading">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold">{{ item.title }}</span>
              <e-icon :icon="item.icon.name" :post-icon="item.icon.entity"></e-icon>
            </div>
          </template>
          <div class="flex items-center justify-between mb-2">
            <NumberTransition class="text-2xl" :end-number="item.growth"></NumberTransition>
            <SvgIcon
              class="w-12 h-12"
              :class="{ 'text-red-500': !(item.growth % 2), 'rotate-x': item.growth % 2 }"
              name="twotone-trending-up"
            />
          </div>
          <div class="flex items-center justify-between text-sm">
            <span>{{ item.totalTitle }}</span>
            <NumberTransition :end-number="item.total" />
          </div>
        </Card>
      </el-col>
    </template>
  </el-row>
</template>

<style lang="less" scoped>
.rotate-x {
  color: rgb(47, 255, 57);
  transform: rotateX(180deg);
}
</style>
