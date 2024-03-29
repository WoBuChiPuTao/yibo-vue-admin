<template>
  <BasicContainer>
    <div class="flex flex-row-reverse mb-2">
      <div>
        <ElButton type="primary" @click="handleCreate">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          {{ t('common.button.addText') }}
        </ElButton>
      </div>
    </div>
    <ElTable :data="tableData" v-loading="tableLoading" row-key="name">
      <template v-for="item in columnsInfo" :key="item.prop">
        <ElTableColumn
          :align="item.align"
          :min-width="item.minWidth"
          :prop="item.prop"
          :label="item.label"
        >
          <!-- 名称插槽 -->
          <template v-if="item.prop === 'name'" #default="{ row }">
            {{ t(row.name) }}
          </template>
          <template v-else-if="item.prop === 'icon'" #default="{ row }">
            <EIcon
              class="inline-flex text-base text-center"
              v-if="row.icon"
              :icon="row.icon"
            ></EIcon>
          </template>
          <!-- 按钮插槽 -->
          <template v-else-if="item.prop === 'rights'" #default="{ row }">
            <template v-if="row.rights">
              <template v-if="row.rights.length < 3">
                <ElTag v-for="(right, index) in row.rights" :key="index" class="mr-1">{{
                  right.buttonName
                }}</ElTag>
              </template>
              <template v-else>
                <ElTag class="mr-1">{{ row.rights[0].buttonName }}</ElTag>
                <ElTag class="mr-1">{{ row.rights[1].buttonName }}</ElTag>
                <ElTooltip effect="light">
                  <ElTag>{{ '+' + (row.rights.length - 2) }}</ElTag>
                  <template #content>
                    <ElTag
                      v-for="(right, index) in row.rights.slice(2)"
                      :key="index"
                      class="mr-1"
                      >{{ right.buttonName }}</ElTag
                    >
                  </template>
                </ElTooltip>
              </template>
            </template>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn
        align="center"
        fixed="right"
        :min-width="150"
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
    <Drawer
      :value="rowData"
      :menus="tableData"
      v-model:visible="drawerVisible"
      @save="handleSave"
    />
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElTable, ElTableColumn, ElIcon, ElTag, ElTooltip } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import EIcon from '@/components/icons/EIcon.vue'
import { columnsInfo } from './info'
import { Menu } from '#/list'
import { useI18n } from '@/hooks/web/useI18n'
import Drawer from './drawer.vue'
import { getAllMenu } from '@/api/sys/system'
import '&/modules/system'

export default defineComponent({
  name: 'MenuManagement',
  components: {
    ElTable,
    ElTableColumn,
    ElIcon,
    Plus,
    EIcon,
    ElTag,
    ElTooltip,
    Drawer
  },
  setup() {
    const tableLoading = ref(false)
    const drawerVisible = ref(false)

    const tableData = reactive<Menu[]>([])

    const rowData = reactive<Menu>({
      name: '',
      path: '',
      parentPath: undefined,
      orderNo: undefined,
      icon: undefined,
      redirect: undefined,
      children: undefined,
      rights: undefined,
      hideMenu: undefined,
      fixedTab: false
    })

    const { t } = useI18n()

    async function getTableData() {
      tableData.splice(0, tableData.length)
      tableLoading.value = true
      try {
        const menus = await getAllMenu()
        tableData.push(...menus)
      } catch (error) {
        console.error(error)
      } finally {
        tableLoading.value = false
      }
    }

    function handleCreate() {
      Object.keys(rowData).forEach((key) => {
        rowData[key] = undefined
      })
      drawerVisible.value = true
    }

    function handleEdit(row: Menu) {
      Object.keys(rowData).forEach((key) => {
        rowData[key] = row[key]
      })
      drawerVisible.value = true
    }

    function handleSave(menu: Menu) {
      if (rowData.path === undefined) {
        tableData.push(menu)
        return
      }
      const findMenu = tableData.find((item) => item.path === rowData.path)
      if (!findMenu) return
      Object.keys(menu).forEach((key) => {
        findMenu[key] = menu[key]
      })
    }

    getTableData()

    return {
      tableLoading,
      drawerVisible,
      tableData,
      rowData,
      columnsInfo,
      t,
      handleCreate,
      handleEdit,
      handleSave
    }
  }
})
</script>
