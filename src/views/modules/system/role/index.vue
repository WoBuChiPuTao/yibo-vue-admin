<template>
  <BasicContainer>
    <div class="flex justify-between mb-2">
      <div>
        <ElInput :placeholder="t('module.system.roleName')" class="w-32 mr-4"> </ElInput>
        <ElButton type="primary">
          <el-icon>
            <Search></Search>
          </el-icon>
          {{ t('common.button.queryText') }}
        </ElButton>
      </div>
      <div>
        <ElButton type="primary" @click="handleCreate">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          {{ t('common.button.addText') }}
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
              :active-text="t('common.radio.enabled')"
              :inactive-text="t('common.radio.disabled')"
              @change="(val) => changeRoleState(val as boolean, row)"
            ></ElSwitch>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn
        align="center"
        fixed="right"
        :min-width="120"
        :label="t('common.table.operation')"
      >
        <template #default="{ row }">
          <ElButton link type="primary" size="small" @click="handleEdit(row)">{{
            t('common.button.editText')
          }}</ElButton>
          <ElButton link type="danger" size="small">{{ t('common.button.delText') }}</ElButton>
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
    <Drawer :menus="allMenus" v-model:visible="drawerVisible" :value="drawerData"></Drawer>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElIcon, ElInput, ElTable, ElTableColumn, ElPagination, ElSwitch } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useTableHeight } from '@/components/table/useTableHeight'
import { columnsInfo, roleData } from './info'
import Drawer from './components/Drawer.vue'
import { RoleInfo } from '#/store'
import { getAllMenu } from '@/api/sys/system'
import '&/modules/system'
import { Menu } from '#/list'
import { useI18n } from '@/hooks/web/useI18n'

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
      roleId: '',
      roleName: '',
      state: false,
      createTime: '',
      remarks: undefined,
      menu: []
    })
    const allMenus = reactive<Menu[]>([])

    const { t } = useI18n()
    const { tableHeight } = useTableHeight(tableEl, tableData)

    function changeRoleState(val: boolean, role: RoleInfo): void {
      const findRole = tableData.find((item) => item.roleId === role.roleId)
      if (!findRole) return
      findRole.state = val
    }

    async function getTableData() {
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      const data = roleData
      const reg = new RegExp(`${searchInfo.name}`, 'g')
      tableData.push(...data.filter((item) => reg.test(item.roleName)))
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

    async function getMenus() {
      try {
        const menus = await getAllMenu()
        allMenus.splice(0, allMenus.length)
        allMenus.push(...menus)
      } catch (error) {
        console.error(error)
      }
    }

    getMenus()

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
      allMenus,
      changeRoleState,
      handleCreate,
      handleEdit,
      t
    }
  }
})
</script>
