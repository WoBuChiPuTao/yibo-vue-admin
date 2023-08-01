<template>
  <BasicContainer>
    <div class="flex justify-between mb-2">
      <div v-if="getRights.findIndex((right) => right.buttonId === '777') !== -1">
        <ElInput
          v-model="searchInfo.instCode"
          placeholder="产品代码"
          class="w-32 mr-4"
          size="default"
        >
        </ElInput>
        <ElButton type="primary" @click="handleSearch">
          <el-icon>
            <Search></Search>
          </el-icon>
          查询
        </ElButton>
      </div>
      <div v-if="getRights.findIndex((right) => right.buttonId === '111') !== -1">
        <ElButton type="primary" @click="handleCreate">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          新增
        </ElButton>
      </div>
    </div>
    <ElTable ref="tableEl" :data="tableData" :height="tableHeight" v-loading="tableLoading">
      <template #empty>
        <ElEmpty></ElEmpty>
      </template>
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
          <ElButton
            v-if="getRights.findIndex((right) => right.buttonId === '222') !== -1"
            link
            type="primary"
            size="small"
            @click="handleEdit(row)"
            >修改</ElButton
          >
          <ElButton
            v-if="getRights.findIndex((right) => right.buttonId === '333') !== -1"
            link
            type="danger"
            size="small"
            @click="handleDelete(row.instCode)"
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
      label-width="80px"
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
  ElOption,
  ElEmpty
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import DialogDescriptions from '@/components/dialog/DialogDescriptions.vue'
import CruDrawer from '@/components/crud/CruDrawer.vue'
import { columnsInfo, rules } from './info'
import { getBondData, putBondData, delBondData } from '@/api/bond/bond'
import { formatDateOfObj } from '@/utils/dateFormat'
import { useRights } from '@/hooks/useRights'
import { useI18n } from '@/hooks/web/useI18n'
// import '&/bond'

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
    ElOption,
    ElEmpty
  },
  setup() {
    const dialogVisible = ref(false)
    const searchButtonLoading = ref(false)
    const tableLoading = ref(false)
    const tableEl = ref(null)
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

    const { t } = useI18n()
    const { tableHeight } = useTableHeight(tableEl)
    const getRights = useRights()

    const drawerVisible = ref(false)
    const eventType = ref<CruEventType>('view')

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
        ElMessage.success(t('common.message.delSuccess'))
      } catch (error) {
        ElMessage.success(t('common.message.delFailed'))
        console.error(error)
      }
      getTableData()
    }

    async function getTableData() {
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      try {
        const data = await getBondData()
        const reg = new RegExp(`${searchInfo.instCode}`, 'g')
        tableData.push(...data.filter((item) => reg.test(item.instCode)))
        pageInfo.total = tableData.length
      } catch (error) {
        console.error('error', error)
      } finally {
        tableLoading.value = false
      }
    }

    async function handleSubmit(value: TableDataType, eventType: CruEventType) {
      console.log('val', value)
      formatDateOfObj(value)
      try {
        await putBondData(value)
        eventType === 'update'
          ? ElMessage.success(t('common.message.modifySuccess'))
          : ElMessage.success(t('common.message.addSuccess'))
      } catch (error) {
        console.error(error)
        eventType === 'update'
          ? ElMessage.success(t('common.message.modifyFailed'))
          : ElMessage.success(t('common.message.addFailed'))
      }

      getTableData()
    }

    getTableData()

    return {
      drawerVisible,
      dialogVisible,
      tableLoading,
      tableEl,
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
      rules,
      getRights,
      t
    }
  }
})
</script>
