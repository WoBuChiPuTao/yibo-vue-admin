<template>
  <div class="flex flex-col items-center">
    <div :style="{ height: '900px' }"> 占位</div>
    <LazyContainer>
      <img :src="Img" alt="" :style="{ height: '300px', width: '200px' }" />
    </LazyContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LazyContainer from '@/components/lazy/LazyContainer.vue'
import Img from '@/assets/img/logo.jpg'

export default defineComponent({
  name: 'LazyDemo',
  components: { LazyContainer },
  setup() {
    return { Img }
  }
})
</script>
