<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col flex-1 p-4 m-4 report-container">
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">{{ '中债组合' }}</span>
      </div>
      <ElTabs v-model="tabName" class="flex flex-col flex-1">
        <ElTabPane :label="t('module.report.information.information')" name="information">
          <BaseInfo></BaseInfo>
        </ElTabPane>
        <ElTabPane :label="t('module.report.price.price')" name="price"><Price></Price></ElTabPane>
        <ElTabPane :label="t('module.report.valuation.valuation')" name="valuation"
          ><Valuation
        /></ElTabPane>
        <ElTabPane :label="t('module.report.limit.limit')" name="limit"><Limit /> </ElTabPane>
        <ElTabPane :label="t('module.report.var.var')" name="var"><VaR></VaR></ElTabPane>
        <ElTabPane :label="t('module.report.retrospective.retrospective')" name="retrospective"
          ><Retrospective
        /></ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import Price from './price/Price.vue'
import BaseInfo from './baseInfo/BaseInfo.vue'
import Valuation from './valuation/Valuation.vue'
import Limit from './limit/Limit.vue'
import VaR from './var/VaR.vue'
import Retrospective from './retrospective/Retrospective.vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'ReportPage',
  components: { ElTabs, ElTabPane, BaseInfo, Price, Valuation, Limit, VaR, Retrospective },
  setup() {
    const { t } = useI18n()
    const tabName = ref<string>('information')
    return { tabName, t }
  }
})
</script>

<style lang="less" scoped>
.report-container {
  background-color: var(--el-bg-color);

  :deep(.el-tabs__content) {
    flex: 1;
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
