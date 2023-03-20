<script setup lang="ts">
import { ElRow, ElCol } from 'element-plus'
import Card from '@/components/card/Card.vue'
import EIcon from '@/components/icons/EIcon.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import logosVue from '@iconify-icons/logos/vue'
import logosReact from '@iconify-icons/logos/react'
import nuxtIcon from '@iconify-icons/logos/nuxt-icon'
import logosNestjs from '@iconify-icons/logos/nestjs'

const props = defineProps({
  skeletonLoading: Boolean
})

const cardList = [
  {
    title: 'Vue',
    icon: { name: 'logos:vue', entity: logosVue },
    growth: 222222,
    totalTitle: '总访问数',
    total: 3333333
  },
  {
    title: 'React',
    icon: { name: 'logos:react', entity: logosReact },
    growth: 222222,
    totalTitle: '总访问数',
    total: 3333333
  },
  {
    title: 'Nuxt',
    icon: { name: 'logos:nuxt-icon', entity: nuxtIcon },
    growth: 222222,
    totalTitle: '总访问数',
    total: 3333333
  },
  {
    title: 'Nest',
    icon: { name: 'logos:nestjs', entity: logosNestjs },
    growth: 222222,
    totalTitle: '总访问数',
    total: 3333333
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
            <span class="text-2xl">{{ item.growth }}</span>
            <SvgIcon
              class="w-12 h-12"
              style="color: greenyellow; transform: rotateX(180deg)"
              name="twotone-trending-up"
            />
          </div>
          <div class="flex items-center justify-between text-sm">
            <span>{{ item.totalTitle }}</span>
            <span>{{ item.total }}</span>
          </div>
        </Card>
      </el-col>
    </template>
  </el-row>
</template>
