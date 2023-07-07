<template>
  <ElDrawer v-model="drawerVisible" :size="400">
    <template #header>
      <div>
        <ElButton :size="'default'" type="primary" @click="handleSave"> 保存 </ElButton>
      </div>
    </template>
    <ElForm ref="formRef" :model="value" label-width="80px">
      <ElFormItem label="角色代码">
        <ElInput v-model="roleVal.roleId"></ElInput>
      </ElFormItem>
      <ElFormItem label="角色名称">
        <ElInput v-model="roleVal.roleName"></ElInput>
      </ElFormItem>
      <ElFormItem label="角色状态">
        <ElRadioGroup v-model="roleVal.state">
          <ElRadioButton :label="true">启用</ElRadioButton>
          <ElRadioButton :label="false">禁用</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="备注">
        <ElInput v-model="roleVal.remarks" type="textarea"></ElInput>
      </ElFormItem>
      <Tree ref="treeRef" :selected-menu="roleVal.menu" :visible="visible"></Tree>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { RoleInfo } from '#/store'
import { ElDrawer, ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadioButton } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { computed, PropType, reactive, ref, unref, watch } from 'vue'
import Tree from './Tree.vue'

const props = defineProps({
  value: {
    type: Object as PropType<RoleInfo>,
    default: () => ({})
  },
  visible: Boolean
})

const emits = defineEmits<{
  (e: 'save', RoleInfo: RoleInfo, oldRoleInfo: RoleInfo): void
  (e: 'update:visible', value: boolean): void
}>()

const drawerVisible = computed<boolean>({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})

const treeRef = ref<InstanceType<typeof Tree>>()

const roleVal = reactive(cloneDeep(props.value))

watch(
  () => props.visible,
  () => {
    Object.keys(roleVal).forEach((key) => (roleVal[key] = props.value[key]))
    roleVal.state = !!roleVal.state
  },
  {
    immediate: true
  }
)

function handleSave() {
  const treeEl = unref(treeRef)
  if (!treeEl) return
  console.log('treeData', treeEl.getCurrentMenus())
}
</script>
