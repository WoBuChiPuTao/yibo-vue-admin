<template>
  <Card :loading="props.skeletonLoading">
    <template #header>
      <div class="flex items-center justify-center">
        <span class="text-xl font-bold">{{ '访问进度' }}</span>
      </div>
    </template>
    <div class="flex flex-col justify-between h-64">
      <template v-for="item in data" :key="item.title">
        <ProgressBar
          :title="item.title"
          :color="item.color"
          :progress-value="item.progress"
          :total="item.total"
          round
        ></ProgressBar>
      </template>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import ProgressBar from '@/components/progressBar/ProgressBar.vue'

const data = [
  {
    title: 'Angular',
    color: '#e00000',
    progress: 100,
    total: 500
  },
  {
    title: 'Vue',
    color: '#00e000',
    progress: 200,
    total: 500
  },
  {
    title: 'React',
    color: '#00bedf',
    progress: 300,
    total: 500
  },
  {
    title: 'Svelte',
    color: '#df6400',
    progress: 400,
    total: 500
  },
  {
    title: 'TypeScript',
    color: '#005cb3',
    progress: 500,
    total: 500
  }
]

const props = defineProps({
  skeletonLoading: Boolean
})
</script>
