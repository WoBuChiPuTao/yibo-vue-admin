<template>
  <BasicContainer>
    <div class="flex justify-between mb-2">
      <div>
        <ElInput
          v-model="searchInfo.instCode"
          placeholder="产品代码"
          :style="{ width: '120px' }"
          class="mr-4"
        >
        </ElInput>
        <ElButton type="primary">
          <el-icon>
            <Search></Search>
          </el-icon>
          查询
        </ElButton>
      </div>
      <div>
        <ElButton type="primary">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          新增
        </ElButton>
      </div>
    </div>
    <ElTable :data="tableData" :height="tableHeight" v-loading="loading">
      <ElTableColumn
        align="center"
        prop="instCode"
        :min-width="120"
        label="产品代码"
      ></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="instName"
        :min-width="120"
        label="产品名称"
      ></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="bondType"
        :min-width="120"
        label="债券类型"
      ></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="marketType"
        :min-width="120"
        label="市场类型"
      ></ElTableColumn>
      <ElTableColumn align="center" prop="market" :min-width="120" label="市场"></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="marketCode"
        :min-width="120"
        label="市场代码"
      ></ElTableColumn>
      <ElTableColumn align="center" prop="issuer" :min-width="120" label="发行人"></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="issuingDate"
        :min-width="120"
        label="发行时间"
      ></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="issuePrice"
        :min-width="120"
        label="发行价格"
      ></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="valueDate"
        :min-width="120"
        label="起息日"
      ></ElTableColumn>
      <ElTableColumn align="center" prop="dueDate" :min-width="120" label="到期日"></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="maturityPeriod"
        :min-width="120"
        label="到期期限"
      ></ElTableColumn>
      <ElTableColumn align="center" prop="coupon" :min-width="120" label="票面利率"></ElTableColumn>
      <ElTableColumn
        align="center"
        prop="templateCode"
        :min-width="120"
        label="模板代码"
      ></ElTableColumn>
      <ElTableColumn align="center" fixed="right" :min-width="150" label="操作">
        <template #default="{ row }">
          <ElButton link size="small" @click="handleLook(row)">查看</ElButton>
          <ElButton link type="primary" size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton link type="danger" size="small" @click="handleDelete(row.instCode)"
            >删除</ElButton
          >
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="flex justify-end mt-2">
      <ElPagination
        class="mt-4"
        v-model:current-page="pageInfo.current"
        v-model:page-size="pageInfo.size"
        :total="pageInfo.total"
        :pager-count="7"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20, 50]"
      >
      </ElPagination>
    </div>
    <DialogDescriptions
      v-model="dialogVisible"
      :label-data="labelData"
      :data="descriptionsData"
    ></DialogDescriptions>
    <ElDrawer v-model="drawerVisible" :size="600">
      <ElForm
        ref="formEl"
        :model="formData"
        label-position="left"
        label-width="100px"
        @keypress.enter="handleSubmit"
      >
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="产品代码" prop="instCode">
              <ElInput v-model="formData.instCode" disabled></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="产品名称" prop="instName">
              <ElInput v-model="formData.instName"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="债券类型" prop="bondType">
              <ElInput v-model="formData.bondType"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="市场类型" prop="marketType">
              <ElInput v-model="formData.marketType"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="市场" prop="market">
              <ElInput v-model="formData.market"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="市场代码" prop="marketCode">
              <ElInput v-model="formData.marketCode"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="发行人" prop="issuer">
              <ElInput v-model="formData.issuer"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="发行时间" prop="issuingDate">
              <ElInput v-model="formData.issuingDate"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="发行价格" prop="issuePrice">
              <ElInput v-model="formData.issuePrice"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="起息日" prop="valueDate">
              <ElInput v-model="formData.valueDate"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="到期日" prop="dueDate">
              <ElInput v-model="formData.dueDate"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="到期期限" prop="maturityPeriod">
              <ElInput v-model="formData.maturityPeriod"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="6">
          <ElCol :span="12">
            <ElFormItem label="票面利率" prop="coupon">
              <ElInput v-model="formData.coupon"></ElInput>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="模板代码" prop="templateCode">
              <ElInput v-model="formData.templateCode"></ElInput>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <div class="flex justify-center">
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </ElForm>
    </ElDrawer>
  </BasicContainer>
</template>

<script lang="ts">
import {
  ElTable,
  ElTableColumn,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElInput,
  ElPagination,
  ElIcon,
  ElMessage
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import DialogDescriptions from '@/components/dialog/DialogDescriptions.vue'
import '&/bond'
import { getBondData, putBondData, delBondData } from '@/api/bond/bond'

interface TableDataType {
  instCode: string
  instName: string
  bondType: string
  marketType: string
  market: string
  marketCode: string
  issuer: string
  issuingDate: string
  issuePrice: number
  valueDate: string
  dueDate: string
  maturityPeriod: string | null
  coupon: number
  templateCode: string
}

const labelData = {
  instCode: '产品代码',
  instName: '产品名称',
  bondType: '债券类型',
  marketType: '市场类型',
  market: '市场',
  marketCode: '市场代码',
  issuer: '发行人',
  issuingDate: '发行时间',
  issuePrice: '发行价格',
  valueDate: '起息日',
  dueDate: '到期日',
  maturityPeriod: '到期期限',
  coupon: '票面利率',
  templateCode: '模板代码'
}

export default defineComponent({
  name: 'Bond',
  components: {
    ElTable,
    ElTableColumn,
    ElDrawer,
    ElForm,
    ElFormItem,
    ElRow,
    ElCol,
    ElInput,
    ElPagination,
    ElIcon,
    Search,
    Plus,
    DialogDescriptions
  },
  setup() {
    const drawerVisible = ref(false)
    const dialogVisible = ref(false)
    const loading = ref(false)
    const formEl = ref(null)
    const tableData = reactive<TableDataType[]>([])
    const descriptionsData = reactive<TableDataType>({
      instCode: '',
      instName: '',
      bondType: '',
      marketType: '',
      market: '',
      marketCode: '',
      issuer: '',
      issuingDate: '',
      issuePrice: 0,
      valueDate: '',
      dueDate: '',
      maturityPeriod: null,
      coupon: 0,
      templateCode: ''
    })
    const searchInfo = reactive({ instCode: '' })
    const pageInfo = reactive({ current: 1, size: 10, total: tableData.length })

    const formData = reactive<TableDataType>({
      instCode: '',
      instName: '',
      bondType: '',
      marketType: '',
      market: '',
      marketCode: '',
      issuer: '',
      issuingDate: '',
      issuePrice: 0,
      valueDate: '',
      dueDate: '',
      maturityPeriod: null,
      coupon: 0,
      templateCode: ''
    })

    const { tableHeight } = useTableHeight(formEl, tableData)

    function handleLook(row: TableDataType) {
      Object.keys(row).forEach((key) => {
        descriptionsData[key] = row[key]
      })
      dialogVisible.value = true
    }

    function handleEdit(row: TableDataType) {
      Object.keys(row).forEach((key) => {
        formData[key] = row[key]
      })
      drawerVisible.value = true
    }

    async function handleDelete(instCode: string) {
      try {
        await delBondData(instCode)
        ElMessage.success('删除成功')
      } catch (error) {
        console.error(error)
      }
      getTableData()
    }

    async function getTableData() {
      loading.value = true
      tableData.splice(0, tableData.length)
      const data = await getBondData()
      tableData.push(...data)
      pageInfo.total = tableData.length
      loading.value = false
    }

    async function handleSubmit() {
      try {
        await putBondData(formData)
        ElMessage.success('修改成功')
      } catch (error) {
        console.error(error)
      }
      drawerVisible.value = false
      getTableData()
    }

    getTableData()
    return {
      drawerVisible,
      dialogVisible,
      loading,
      formEl,
      tableData,
      descriptionsData,
      searchInfo,
      pageInfo,
      formData,
      tableHeight,
      labelData,
      handleLook,
      handleEdit,
      handleDelete,
      handleSubmit
    }
  }
})
</script>
