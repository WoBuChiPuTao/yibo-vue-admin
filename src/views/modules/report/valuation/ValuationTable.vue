<template>
  <div class="flex justify-center pt-4">
    <ElDatePicker v-model="day" @change="handleDateChange"></ElDatePicker
  ></div>
  <ElDivider></ElDivider>
  <ElRow :gutter="16">
    <ElCol :span="12">
      <template v-for="data in valuationParam" :key="data.type">
        <ElDescriptions :column="1" :title="data.type">
          <template v-for="item in data.config" :key="item.label">
            <ElDescriptionsItem :label="item.label" align="right" label-class-name="float-left">{{
              item.content
            }}</ElDescriptionsItem>
          </template>
        </ElDescriptions>
        <ElDivider></ElDivider>
      </template>
    </ElCol>
    <ElCol :span="12">
      <ElDescriptions :column="1" :title="day.toLocaleDateString().replace(/\//g, '-')">
        <template v-for="item in descriptionData" :key="item.label">
          <ElDescriptionsItem :label="item.label" align="right" label-class-name="float-left">{{
            item.content
          }}</ElDescriptionsItem>
        </template>
      </ElDescriptions>
      <ElDivider></ElDivider>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElDatePicker,
  ElDivider,
  ElRow,
  ElCol
} from 'element-plus'
import { ref, unref } from 'vue'
import { valuationParam, valuationValue } from './data'

const day = ref(new Date())

const descriptionData = ref(valuationValue)

function handleDateChange() {
  descriptionData.value = unref(descriptionData).map((item) => {
    if (item.label === '货币') {
      item.content = Math.random() > 0.5 ? 'CNY' : 'USD'
    } else {
      item.content = (Math.random() * 2000 - 1000).toFixed(4)
    }
    return item
  })
}
</script>
