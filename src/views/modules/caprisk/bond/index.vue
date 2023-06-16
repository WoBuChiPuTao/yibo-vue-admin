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
        <ElButton type="primary" @click="handleSearch">
          <el-icon>
            <Search></Search>
          </el-icon>
          查询
        </ElButton>
      </div>
      <div>
        <ElButton type="primary" @click="handleCreate">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          新增
        </ElButton>
      </div>
    </div>
    <ElTable :data="tableData" :height="tableHeight" v-loading="tableLoading">
      <template v-for="item in columnsInfo" :key="item.prop">
        <ElTableColumn
          :align="item.align"
          :min-width="item.minWidth"
          :prop="item.prop"
          :label="item.label"
        >
        </ElTableColumn>
      </template>
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
      :label-data="columnsInfo"
      :data="rowData"
    ></DialogDescriptions>
    <CruDrawer
      v-model:model-value="drawerVisible"
      :value="rowData"
      :items-info="columnsInfo"
      :event-type="eventType"
      :formRules="rules"
      :submit-func="handleSubmit"
    >
      <template #bondType="{ col, value }">
        <ElSelect v-model="value[col.prop]">
          <ElOption label="固息债" value="固息债"></ElOption>
          <ElOption label="浮息债" value="浮息债"></ElOption>
          <ElOption label="零息债" value="零息债"></ElOption>
        </ElSelect>
      </template>
    </CruDrawer>
  </BasicContainer>
</template>

<script lang="ts">
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElPagination,
  ElIcon,
  ElMessage,
  ElSelect,
  ElOption
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import DialogDescriptions from '@/components/dialog/DialogDescriptions.vue'
import CruDrawer from '@/components/crud/CruDrawer.vue'
import { columnsInfo, rules } from './info'
import '&/bond'
import { getBondData, putBondData, delBondData } from '@/api/bond/bond'
import { formatDateOfObj } from '@/utils/dateFormat'
import { CruEventEnum } from '@/enums/components'

interface TableDataType {
  instCode: string
  instName: string
  bondType: string
  marketType: string
  market: string
  marketCode: string
  issuer: string
  issuingDate: string | null
  issuePrice: number
  valueDate: string | null
  dueDate: string | null
  maturityPeriod: string | null
  coupon: number
  templateCode: string
}

export default defineComponent({
  name: 'Bond',
  components: {
    ElTable,
    ElTableColumn,
    ElInput,
    ElPagination,
    ElIcon,
    Search,
    Plus,
    DialogDescriptions,
    CruDrawer,
    ElSelect,
    ElOption
  },
  setup() {
    const dialogVisible = ref(false)
    const searchButtonLoading = ref(false)
    const tableLoading = ref(false)
    const formEl = ref(null)
    const tableData = reactive<TableDataType[]>([])
    const searchInfo = reactive({ instCode: '' })
    const pageInfo = reactive({ current: 1, size: 10, total: tableData.length })

    const rowData = reactive<TableDataType>({
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
      dueDate: null,
      maturityPeriod: null,
      coupon: 0,
      templateCode: ''
    })

    const { tableHeight } = useTableHeight(formEl, tableData)

    const drawerVisible = ref(false)
    const eventType = ref<'view' | 'create' | 'update'>('view')

    async function handleSearch() {
      searchButtonLoading.value = true
      await getTableData()
      searchButtonLoading.value = false
    }

    function handleLook(row: TableDataType) {
      Object.keys(row).forEach((key) => {
        rowData[key] = row[key]
      })
      dialogVisible.value = true
    }

    function handleEdit(row: TableDataType) {
      Object.keys(row).forEach((key) => {
        rowData[key] = row[key]
      })
      eventType.value = 'update'
      drawerVisible.value = true
    }

    function handleCreate() {
      eventType.value = 'create'
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
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      const data = await getBondData()
      const reg = new RegExp(`${searchInfo.instCode}`, 'g')
      tableData.push(...data.filter((item) => reg.test(item.instCode)))
      pageInfo.total = tableData.length
      tableLoading.value = false
    }

    async function handleSubmit(value: TableDataType, eventType: CruEventEnum) {
      console.log('val', value)
      formatDateOfObj(value)
      try {
        await putBondData(value)
        eventType === CruEventEnum.update
          ? ElMessage.success('修改成功')
          : ElMessage.success('创建成功')
      } catch (error) {
        console.error(error)
      }

      getTableData()
    }

    getTableData()

    return {
      drawerVisible,
      dialogVisible,
      tableLoading,
      formEl,
      tableData,
      rowData,
      searchInfo,
      pageInfo,
      tableHeight,
      columnsInfo,
      handleSearch,
      handleLook,
      handleEdit,
      handleDelete,
      handleSubmit,
      eventType,
      handleCreate,
      rules
    }
  }
})
</script>