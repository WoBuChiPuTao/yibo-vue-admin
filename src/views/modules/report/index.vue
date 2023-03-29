<template>
  <div class="p-4">
    <Card>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">{{ '中债组合' }}</span>
        </div>
      </template>
      <ElTabs v-model="tabName">
        <ElTabPane label="Information" name="information">
          <ElRow :gutter="16">
            <ElCol :span="24">
              <BaseInfo></BaseInfo>
            </ElCol>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="Price" name="price"><Price></Price></ElTabPane>
        <ElTabPane label="Valuation" name="valuation"><Valuation /></ElTabPane>
        <ElTabPane label="Limit" name="limit"><Limit /> </ElTabPane>
        <ElTabPane label="VaR" name="var"></ElTabPane>
        <ElTabPane label="Stress" name="stress"></ElTabPane>
        <ElTabPane label="Retrospective" name="retrospective"></ElTabPane>
      </ElTabs>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import Card from '@/components/card/Card.vue'
import Price from './price/Price.vue'
import BaseInfo from './baseInfo/BaseInfo.vue'
import Valuation from './valuation/Valuation.vue'
import Limit from './limit/Limit.vue'

export default defineComponent({
  name: 'ReportPage',
  components: { ElTabs, ElTabPane, ElRow, ElCol, BaseInfo, Price, Card, Valuation, Limit },
  setup() {
    const tabName = ref<string>('information')
    return { tabName }
  }
})
</script>
