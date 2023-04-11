<template>
  <div class="flex flex-col h-full">
    <div class="relative flex-1">
      <ElTable ref="table" :data="tableData" class="absolute h-full" :height="tableHeight">
        <ElTableColumn prop="Index" label="Index"></ElTableColumn>
        <ElTableColumn
          prop="tradeCode"
          :label="t('module.report.information.tradeId')"
          min-width="90"
        ></ElTableColumn>
        <ElTableColumn
          prop="BondCode"
          :label="t('module.report.information.productCode')"
          min-width="120"
        ></ElTableColumn>
        <ElTableColumn
          prop="BondName"
          :label="t('module.report.information.productName')"
          min-width="140"
        ></ElTableColumn>
        <ElTableColumn
          prop="isBuy"
          :label="t('module.report.information.buyOrSell')"
        ></ElTableColumn>
        <ElTableColumn
          prop="principal"
          :label="t('module.report.information.principal')"
        ></ElTableColumn>
        <ElTableColumn
          prop="tradePrice"
          :label="t('module.report.information.tradePrice')"
        ></ElTableColumn>
        <ElTableColumn
          prop="accrualConventions"
          :label="t('module.report.information.InterestAccrualConvention')"
          min-width="140"
        ></ElTableColumn>
        <ElTableColumn
          prop="tradeDate"
          :label="t('module.report.information.tradeDate')"
          min-width="100"
        ></ElTableColumn>
        <ElTableColumn
          prop="tradeDesk"
          :label="t('module.report.information.tradeDesk')"
        ></ElTableColumn>
        <ElTableColumn prop="trader" :label="t('module.report.information.trader')"></ElTableColumn>
        <ElTableColumn
          prop="exteriorId"
          :label="t('module.report.information.externalID')"
        ></ElTableColumn>
        <ElTableColumn
          prop="tradeStatus"
          :label="t('module.report.information.tradeStatus')"
        ></ElTableColumn>
        <ElTableColumn fixed="right" label="Operation" min-width="120">
          <template #default>
            <el-button link type="primary" size="small" @click.prevent="dialogVisible = true">
              {{ t('common.button.view') }}
            </el-button>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="flex justify-end mt-2">
      <ElPagination
        v-model:current-page="pageData.current"
        v-model:page-size="pageData.size"
        :total="pageData.total"
        :pager-count="7"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20, 50]"
      >
      </ElPagination>
    </div>
    <ElDialog v-model="dialogVisible">
      <ElDescriptions title="债券信息" :border="true" :column="3">
        <ElDescriptionsItem label="产品代码">zc17050804.SH</ElDescriptionsItem>
        <ElDescriptionsItem label="产品名称">普惠E贷2A</ElDescriptionsItem>
        <ElDescriptionsItem label="债券类型">固息债</ElDescriptionsItem>

        <ElDescriptionsItem label="市场类型"></ElDescriptionsItem>
        <ElDescriptionsItem label="市场">CFETS</ElDescriptionsItem>
        <ElDescriptionsItem label="市场代码">zc17050804.SH</ElDescriptionsItem>

        <ElDescriptionsItem label="发行人">重庆金安小额贷款有限公司</ElDescriptionsItem>
        <ElDescriptionsItem label="发行日期">2017-03-31</ElDescriptionsItem>
        <ElDescriptionsItem label="发行价格">100</ElDescriptionsItem>

        <ElDescriptionsItem label="起息日">2017-03-31</ElDescriptionsItem>
        <ElDescriptionsItem label="到期日">2020-03-3</ElDescriptionsItem>
        <ElDescriptionsItem label="到期期限">1M</ElDescriptionsItem>

        <ElDescriptionsItem label="票面利率">0.053000</ElDescriptionsItem>
        <ElDescriptionsItem label="模板代码">CN_TREAS_ZERO</ElDescriptionsItem>
        <ElDescriptionsItem label="信用等级">AA+</ElDescriptionsItem>
      </ElDescriptions>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElDialog,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'
import { computed, reactive, ref, unref } from 'vue'
import { tradeData } from './data'
import { useTableHeight } from '@/components/table/useTableHeight'

const { t } = useI18n()

const table = ref(null)

const pageData = reactive({ current: 1, size: 10, total: tradeData.length })

const tableData = computed(() => {
  const { current, size } = unref(pageData)
  return tradeData.slice((current - 1) * size, (current - 1) * size + size)
})

const dialogVisible = ref(false)

const { tableHeight } = useTableHeight(table, tableData, 64)
</script>

<style lang="less" scoped>
:deep(.el-table) {
  height: 100%;
}
</style>
