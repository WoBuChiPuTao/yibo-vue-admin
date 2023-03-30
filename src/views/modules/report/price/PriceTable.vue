<template>
  <div class="flex justify-center pt-4">
    <ElDatePicker v-model="day" @change="handleDateChange"></ElDatePicker
  ></div>
  <ElDivider></ElDivider>
  <ElDescriptions :column="1">
    <template v-for="item in descriptionParam" :key="item.label">
      <ElDescriptionsItem :label="item.label" align="right" label-class-name="float-left">{{
        item.content
      }}</ElDescriptionsItem>
    </template>
  </ElDescriptions>
  <ElDivider></ElDivider>
  <ElDescriptions :column="1">
    <template v-for="item in descriptionData" :key="item.label">
      <ElDescriptionsItem :label="item.label" align="right" label-class-name="float-left">
        <span class="mr-8">{{ item.content }}</span>
        <SvgIcon
          class="w-5 h-5"
          :class="[item.content >= 0 ? 'text-red-500' : 'text-green-500 rotate-x-180']"
          name="twotone-trending-up"
        />
      </ElDescriptionsItem>
    </template>
  </ElDescriptions>
  <ElDivider></ElDivider>
</template>

<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem, ElDatePicker, ElDivider } from 'element-plus'
import { ref, unref } from 'vue'
import { descriptionParam, descriptionValue } from './data'
import SvgIcon from '@/components/icons/SvgIcon.vue'

const day = ref(new Date())

const descriptionData = ref(descriptionValue)

function handleDateChange() {
  descriptionData.value = unref(descriptionData).map((item) => {
    item.content = Number((Math.random() * 2000 - 1000).toFixed(4))
    return item
  })
}
</script>

<style lang="less" scoped>
.rotate-x-180 {
  transform: rotateX(180deg);
}
</style>
