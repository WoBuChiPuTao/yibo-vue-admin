<template>
  <BasicContainer>
    <div class="flex flex-row-reverse mb-2">
      <div>
        <ElButton type="primary" @click="handleCreate">
          <el-icon>
            <Plus></Plus>
          </el-icon>
          新增
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
                  right.name
                }}</ElTag>
              </template>
              <template v-else>
                <ElTag class="mr-1">{{ row.rights[0].name }}</ElTag>
                <ElTag class="mr-1">{{ row.rights[1].name }}</ElTag>
                <ElTooltip effect="light">
                  <ElTag>{{ '+' + (row.rights.length - 2) }}</ElTag>
                  <template #content>
                    <ElTag
                      v-for="(right, index) in row.rights.slice(2)"
                      :key="index"
                      class="mr-1"
                      >{{ right.name }}</ElTag
                    >
                  </template>
                </ElTooltip>
              </template>
            </template>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn align="center" fixed="right" :min-width="150" label="操作">
        <template #default="{ row }">
          <ElButton link type="primary" size="small" @click="handleEdit(row)">修改</ElButton>
          <ElButton link type="danger" size="small">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <Drawer :value="rowData" :menus="tableData" v-model:visible="drawerVisible" />
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElTable, ElTableColumn, ElIcon, ElTag, ElTooltip } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import EIcon from '@/components/icons/EIcon.vue'
import { menus, columnsInfo } from './info'
import { Menu } from '#/list'
import { useI18n } from '@/hooks/web/useI18n'
import Drawer from './Drawer.vue'

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

    const tableData = reactive<Menu[]>(menus)

    const rowData = reactive<Menu>({
      name: '',
      path: '',
      routeName: '',
      parentPath: undefined,
      orderNo: undefined,
      icon: undefined,
      redirect: undefined,
      children: undefined,
      rights: undefined,
      hideMenu: undefined
    })

    const { t } = useI18n()

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

    return {
      tableLoading,
      drawerVisible,
      tableData,
      rowData,
      columnsInfo,
      t,
      handleCreate,
      handleEdit
    }
  }
})
</script>
