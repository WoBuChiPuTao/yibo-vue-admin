<template>
  <div
    :style="{ height: '100%', width: '100%' }"
    class="flex flex-wrap items-center justify-around"
  >
    <Card>
      <template #header> canvas示例 </template>
      <QRCode :value="qrCodeUrl"></QRCode>
    </Card>
    <Card>
      <template #header> Image示例 </template>
      <QRCode :value="qrCodeUrl" draw-type="img"></QRCode>
    </Card>
    <Card>
      <template #header> 颜色示例 </template>
      <QRCode :value="qrCodeUrl" :options="{ color: { dark: '#0059ff' } }"></QRCode>
    </Card>
    <Card>
      <template #header> 插入图片示例 </template>
      <QRCode :value="qrCodeUrl" :image="ImageSrc"></QRCode>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QRCode } from '@/components/QRcode'
import Card from '@/components/card/Card.vue'
import ImageSrc from '@/assets/img/logo.jpg'

const qrCodeUrl = 'http://101.35.249.181/'
export default defineComponent({
  name: 'QRcode',
  components: { QRCode, Card },
  setup() {
    return {
      qrCodeUrl,
      ImageSrc
    }
  }
})
</script>
