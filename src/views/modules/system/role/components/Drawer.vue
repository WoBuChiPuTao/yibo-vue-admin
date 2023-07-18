<template>
  <ElDrawer v-model="drawerVisible" :size="400">
    <template #header>
      <div>
        <ElButton :size="'default'" type="primary" @click="handleSave">
          {{ t('common.button.saveText') }}
        </ElButton>
      </div>
    </template>
    <ElForm ref="formRef" :model="value" label-width="100px">
      <ElFormItem :label="t('module.system.roleId')">
        <ElInput v-model="roleVal.roleId"></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('module.system.roleName')">
        <ElInput v-model="roleVal.roleName"></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('module.system.roleStatus')">
        <ElRadioGroup v-model="roleVal.state">
          <ElRadioButton :label="true">{{ t('common.radio.enableText') }}</ElRadioButton>
          <ElRadioButton :label="false">{{ t('common.radio.disableText') }}</ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem :label="t('module.system.remarks')">
        <ElInput v-model="roleVal.remarks" type="textarea"></ElInput>
      </ElFormItem>
      <Tree ref="treeRef" :menus="menus" :selected-menu="roleVal.menu" :visible="visible"></Tree>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { Menu } from '#/list'
import { RoleInfo } from '#/store'
import { useI18n } from '@/hooks/web/useI18n'
import { ElDrawer, ElForm, ElFormItem, ElInput, ElRadioGroup, ElRadioButton } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { computed, PropType, reactive, ref, unref, watch } from 'vue'
import Tree from './Tree.vue'

const props = defineProps({
  value: {
    type: Object as PropType<RoleInfo>,
    default: () => ({})
  },
  menus: Array as PropType<Menu[]>,
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

const { t } = useI18n()

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
