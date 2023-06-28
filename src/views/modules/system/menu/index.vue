<template>
  <BasicContainer>
    <div class="flex flex-row-reverse mb-2">
      <div>
        <ElButton type="primary">
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
              :icon="row.icon.name"
            ></EIcon>
          </template>
        </ElTableColumn>
      </template>
      <ElTableColumn align="center" fixed="right" :min-width="150" label="操作">
        <template #default>
          <ElButton link type="primary" size="small">修改</ElButton>
          <ElButton link type="danger" size="small">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </BasicContainer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElTable, ElTableColumn, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import EIcon from '@/components/icons/EIcon.vue'
import { menus, columnsInfo } from './info'
import { Menu } from '#/list'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'MenuManagement',
  components: {
    ElTable,
    ElTableColumn,
    ElIcon,
    Plus,
    EIcon
  },
  setup() {
    const tableLoading = ref(false)
    const formEl = ref(null)
    const tableData = reactive<Menu[]>([])
    const searchInfo = reactive({ name: '' })

    const rowData = reactive<Menu>({
      name: '',
      path: '',
      orderNo: 0,
      icon: { name: '' }
    })

    const { t } = useI18n()

    async function getTableData() {
      tableLoading.value = true
      tableData.splice(0, tableData.length)
      const data = menus
      const reg = new RegExp(`${searchInfo.name}`, 'g')
      tableData.push(...data.filter((item) => reg.test(item.name)))
      tableLoading.value = false
    }

    getTableData()

    return {
      tableLoading,
      formEl,
      tableData,
      rowData,
      searchInfo,
      columnsInfo,
      t
    }
  }
})
</script>
