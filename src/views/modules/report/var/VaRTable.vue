<template>
  <div class="flex justify-center pt-4">
    <ElDatePicker v-model="day" @change="handleDateChange"></ElDatePicker
  ></div>
  <ElDivider></ElDivider>
  <ElRow :gutter="16">
    <ElCol :span="12">
      <ElDescriptions :column="1">
        <template v-for="item in varParam" :key="item.label">
          <ElDescriptionsItem :label="item.label" align="right" label-class-name="float-left">{{
            item.content
          }}</ElDescriptionsItem>
        </template>
      </ElDescriptions>
      <ElDivider></ElDivider>
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
import { varParam, varValue } from './data'

const day = ref(new Date())

const descriptionData = ref(varValue)

function handleDateChange() {
  descriptionData.value = unref(descriptionData).map((item) => {
    item.content = (Math.random() * 2000 - 1000).toFixed(4)

    return item
  })
}
</script>
