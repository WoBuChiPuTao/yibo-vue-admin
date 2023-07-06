<template>
  <BasicContainer>
    <div class="flex justify-between mb-2">
      <div>
        <ElInput placeholder="角色名称" class="w-32 mr-4"> </ElInput>
        <ElButton type="primary">
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
          <!-- 状态插槽 -->
          <template v-if="item.prop === 'state'" #default="{ row }">
            <ElSwitch
              :model-value="row.state"
              inline-prompt
              active-text="已启用"
              inactive-text="已禁用"
              @change="(val) => changeRoleState(val as boolean, row)"
            ></ElSwitch>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn align="center" fixed="right" :min-width="120" label="操作">
        <template #default="{ row }">
          <ElButton link type="primary" size="small" @click="handleEdit(row)">编辑</ElButton>
          <ElButton link type="danger" size="small">删除</ElButton>
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
    <Drawer v-model:visible="drawerVisible" :value="drawerData"></Drawer>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElIcon, ElInput, ElTable, ElTableColumn, ElPagination, ElSwitch } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import { RoleInfo, columnsInfo, roleData } from './info'
import Drawer from './components/Drawer.vue'

export default defineComponent({
  name: 'RoleManagament',
  components: {
    Plus,
    Search,
    ElIcon,
    ElInput,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElSwitch,
    Drawer
  },
  setup() {
    const tableEl = ref(null)
    const tableLoading = ref(false)
    const tableData = reactive<RoleInfo[]>([])

    const searchInfo = reactive({ name: '', state: -1 })

    const pageInfo = reactive({ current: 1, size: 10, total: tableData.length })

    const drawerVisible = ref(false)
    const drawerData = reactive<RoleInfo>({
      code: '',
      name: '',
      state: false,
      createTime: '',
      remarks: undefined,
      menu: []
    })

    const { tableHeight } = useTableHeight(tableEl, tableData)

    function changeRoleState(val: boolean, role: RoleInfo): void {
      const findRole = tableData.find((item) => item.code === role.code)
      if (!findRole) return
      findRole.state = val
    }

    async function getTableData() {
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      const data = roleData
      const reg = new RegExp(`${searchInfo.name}`, 'g')
      tableData.push(...data.filter((item) => reg.test(item.name)))
      pageInfo.total = tableData.length
      tableLoading.value = false
    }

    function handleCreate() {
      Object.keys(drawerData).forEach((key) => {
        drawerData[key] = undefined
      })
      drawerVisible.value = true
    }

    function handleEdit(row: RoleInfo) {
      Object.keys(drawerData).forEach((key) => {
        drawerData[key] = row[key]
      })
      drawerVisible.value = true
    }

    getTableData()
    return {
      columnsInfo,
      tableEl,
      tableLoading,
      tableData,
      tableHeight,
      pageInfo,
      drawerVisible,
      drawerData,
      changeRoleState,
      handleCreate,
      handleEdit
    }
  }
})
</script>
