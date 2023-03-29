<template>
  <ElTable :data="tableData">
    <ElTableColumn prop="Index" label="Index"></ElTableColumn>
    <ElTableColumn prop="tradeCode" label="交易ID"></ElTableColumn>
    <ElTableColumn prop="BondCode" label="产品代码"></ElTableColumn>
    <ElTableColumn prop="BondName" label="产品名称"></ElTableColumn>
    <ElTableColumn prop="isBuy" label="买卖"></ElTableColumn>
    <ElTableColumn prop="principal" label="本金"></ElTableColumn>
    <ElTableColumn prop="tradePrice" label="交易价格"></ElTableColumn>
    <ElTableColumn prop="accrualConventions" label="计息惯例" min-width="120"></ElTableColumn>
    <ElTableColumn prop="tradeDate" label="交易时间" min-width="100"></ElTableColumn>
    <ElTableColumn prop="tradeDesk" label="交易台"></ElTableColumn>
    <ElTableColumn prop="trader" label="交易员"></ElTableColumn>
    <ElTableColumn prop="exteriorId" label="外部ID"></ElTableColumn>
    <ElTableColumn prop="tradeStatus" label="状态"></ElTableColumn>
    <ElTableColumn fixed="right" label="Operations" min-width="90">
      <template #default>
        <el-button link type="primary" size="small" @click.prevent="dialogVisible = true">
          查看
        </el-button>
      </template>
    </ElTableColumn>
  </ElTable>
  <div class="flex justify-end mt-2">
    <ElPagination
      v-model:current-page="pageData.current"
      v-model:page-size="pageData.size"
      :total="pageData.total"
      :pager-count="11"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50]"
    ></ElPagination>
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
</template>

<script setup lang="ts">
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

const pageData = reactive({ current: 1, size: 20, total: tradeData.length })

const tableData = computed(() => {
  const { current, size } = unref(pageData)
  return tradeData.slice((current - 1) * size, (current - 1) * size + size)
})

const dialogVisible = ref(false)
</script>
