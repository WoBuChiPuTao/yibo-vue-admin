<template>
  <div
    :style="{ height: '100%', width: '100%' }"
    class="flex flex-wrap items-center justify-around"
  >
    <Card>
      <template #header> canvas示例 </template>
      <QrCode :value="qrCodeUrl"></QrCode>
    </Card>
    <Card>
      <template #header> Image示例 </template>
      <QrCode :value="qrCodeUrl" draw-type="img"></QrCode>
    </Card>
    <Card>
      <template #header> 颜色示例 </template>
      <QrCode :value="qrCodeUrl" :options="{ color: { dark: '#0059ff' } }"></QrCode>
    </Card>
    <Card>
      <template #header> 插入图片示例 </template>
      <QrCode :value="qrCodeUrl" :image="ImageSrc"></QrCode>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QrCode from '@/components/QRcode/QrCode.vue'
import Card from '@/components/card/Card.vue'
import ImageSrc from '@/assets/img/logo.jpg'

const qrCodeUrl = 'http://101.35.249.181/'
export default defineComponent({
  name: 'QRcode',
  components: { QrCode, Card },
  setup() {
    return {
      qrCodeUrl,
      ImageSrc
    }
  }
})
</script>
