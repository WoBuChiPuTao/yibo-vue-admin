<template>
  <BasicContainer>
    <div class="flex justify-between mb-2">
      <div>
        <ElInput v-model="searchInfo.account" placeholder="名称" class="w-32 mr-4"> </ElInput>
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
    <ElTable ref="tableEl" :data="tableData" :height="tableHeight" v-loading="tableLoading">
      <template v-for="item in columnsInfo" :key="item.prop">
        <ElTableColumn
          :align="item.align"
          :min-width="item.minWidth"
          :prop="item.prop"
          :label="item.label"
        >
          <!-- 角色插槽 -->
          <template v-if="item.prop === 'roles'" #default="{ row }">
            <template v-if="row.roles.length < 3">
              <ElTag v-for="(role, index) in row.roles" :key="index" class="mr-1">{{ role }}</ElTag>
            </template>
            <template v-else>
              <ElTag class="mr-1">{{ row.roles[0] }}</ElTag>
              <ElTag class="mr-1">{{ row.roles[1] }}</ElTag>
              <ElTooltip effect="light">
                <ElTag>{{ '+' + (row.roles.length - 2) }}</ElTag>
                <template #content>
                  <ElTag v-for="(role, index) in row.roles.slice(2)" :key="index" class="mr-1">{{
                    role
                  }}</ElTag>
                </template>
              </ElTooltip>
            </template>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn align="center" fixed="right" :min-width="150" label="操作">
        <template #default="{ row }">
          <ElButton link size="small" @click="handleLook(row)">查看</ElButton>
          <ElButton link type="primary" size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton link type="danger" size="small" @click="handleDelete()">删除</ElButton>
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
      width="60%"
      :data="rowData"
    >
      <template #roles="{ data }">
        <template v-if="data.length < 3">
          <ElTag v-for="(role, index) in data" :key="index" class="mr-1">{{ role }}</ElTag>
        </template>
        <template v-else>
          <ElTag class="mr-1">{{ data[0].roleName }}</ElTag>
          <ElTag class="mr-1">{{ data[1].roleName }}</ElTag>
          <ElTooltip effect="light">
            <ElTag>{{ '+' + (data.length - 2) }}</ElTag>
            <template #content>
              <ElTag v-for="(role, index) in data.slice(2)" :key="index" class="mr-1">{{
                role.roleName
              }}</ElTag>
            </template>
          </ElTooltip>
        </template>
      </template>
    </DialogDescriptions>
    <CruDrawer
      v-model:model-value="drawerVisible"
      :value="rowData"
      :column="1"
      :items-info="columnsInfo"
      :event-type="eventType"
      :submit-func="handleSubmit"
    >
      <template #roles="{ col, value }">
        <ElSelect
          class="w-full"
          v-model="value[col.prop]"
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <ElOption label="超级管理员" value="111"></ElOption>
          <ElOption label="测试" value="222"></ElOption>
          <ElOption label="普通用户" value="333"></ElOption>
          <ElOption label="访客" value="444"></ElOption>
        </ElSelect>
      </template>
    </CruDrawer>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElPagination,
  ElIcon,
  ElMessage,
  ElSelect,
  ElOption,
  ElTag,
  ElTooltip
} from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import DialogDescriptions from '@/components/dialog/DialogDescriptions.vue'
import CruDrawer from '@/components/crud/CruDrawer.vue'
import { formatDateOfObj } from '@/utils/dateFormat'
import { userData, columnsInfo, AddUserInfo } from './info'
import { roleData } from '../role/info'

export default defineComponent({
  name: 'AccountManagement',
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
    ElTag,
    ElTooltip
  },
  setup() {
    const dialogVisible = ref(false)
    const searchButtonLoading = ref(false)
    const tableLoading = ref(false)
    const tableEl = ref(null)
    const tableData = reactive<AddUserInfo[]>([])
    const searchInfo = reactive({ account: '' })
    const pageInfo = reactive({ current: 1, size: 10, total: tableData.length })

    const rowData = reactive<AddUserInfo>({
      userId: '',
      userName: '',
      roles: [],
      department: '',
      position: '',
      email: '',
      phone: '',
      remarks: ''
    })

    const { tableHeight } = useTableHeight(tableEl, tableData)

    const drawerVisible = ref(false)
    const eventType = ref<CruEventType>('view')

    async function handleSearch() {
      searchButtonLoading.value = true
      await getTableData()
      searchButtonLoading.value = false
    }

    function handleLook(row: AddUserInfo) {
      Object.keys(rowData).forEach((key) => {
        rowData[key] = row[key]
      })
      dialogVisible.value = true
    }

    function handleEdit(row: AddUserInfo) {
      Object.keys(rowData).forEach((key) => {
        rowData[key] = row[key]
      })
      eventType.value = 'update'
      drawerVisible.value = true
    }

    function handleCreate() {
      eventType.value = 'create'
      drawerVisible.value = true
    }

    async function handleDelete() {
      try {
        //   await delBondData(instCode)
        ElMessage.success('删除成功')
      } catch (error) {
        console.error(error)
      }
      getTableData()
    }

    async function getTableData() {
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      const data = userData
      const reg = new RegExp(`${searchInfo.account}`, 'g')
      tableData.push(...data.filter((item) => reg.test(item.userId)))
      pageInfo.total = tableData.length
      tableLoading.value = false
    }

    async function handleSubmit(value: AddUserInfo, eventType: CruEventType) {
      console.log('val', value)
      formatDateOfObj(value)
      try {
        // await putBondData(value)
        const findUser = tableData.find((item) => item.userId === value.userId)
        if (!findUser) return
        Object.keys(value).forEach((key) => {
          findUser[key] = value[key]
        })
        eventType === 'update' ? ElMessage.success('修改成功') : ElMessage.success('创建成功')
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
      roleData
    }
  }
})
</script>
