<template>
  <ElDrawer v-model="drawerVisible" :size="600">
    <template #header>
      <div>
        <ElButton :size="'default'" type="primary" @click="handleSave">
          {{ t('common.button.saveText') }}
        </ElButton>
      </div>
    </template>
    <ElForm ref="menuFormRef" :model="menuVal" label-width="140px">
      <ElRow>
        <ElCol :span="24" class="mb-4">
          <ElRadioGroup v-model="isDirectory">
            <ElRadioButton :label="true">{{ t('module.system.directory') }}</ElRadioButton>
            <ElRadioButton :label="false">{{ t('module.system.menu') }}</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.menuName')">
            <ElInput v-model="menuVal.name"></ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.parentDirectory')">
            <ElTreeSelect
              v-model="menuVal.parentPath"
              :data="getTree"
              check-strictly
              clearable
              :default-expanded-keys="[menuVal.parentPath || '']"
              :style="{ width: '100%' }"
            ></ElTreeSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.routePath')">
            <ElInput v-model="menuVal.path"></ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.weight')">
            <ElInputNumber v-model="menuVal.orderNo" :style="{ width: '100%' }" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.icon')">
            <IconPicker v-model="menuVal.icon"  v-if="typeof menuVal.icon !== 'object'" :style="{ width: '100%' }" >
            </IconPicker>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow v-if="isDirectory">
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.redirect')">
            <ElInput v-model="menuVal.redirect"></ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow v-else>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.fixedMenu')">
            <ElRadioGroup v-model="menuVal.fixedTab">
              <ElRadioButton :label="true">{{ t('common.radio.trueText') }}</ElRadioButton>
              <ElRadioButton :label="false">{{ t('common.radio.falseText') }}</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="24">
          <ElFormItem :label="t('module.system.hideMenu')">
            <ElRadioGroup v-model="menuVal.hideMenu">
              <ElRadioButton :label="true">{{ t('common.radio.trueText') }}</ElRadioButton>
              <ElRadioButton :label="false">{{ t('common.radio.falseText') }}</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElFormItem :label="t('module.system.button')" v-if="!isDirectory">
        <ElScrollbar class="w-3/4">
          <div class="flex items-center mb-3 h-9">
            <ElButton
              size="small"
              type="primary"
              bg
              text
              class="mr-1 button"
              v-for="right in menuVal.rights"
              :key="right.buttonId"
            >
              {{ t(right.buttonName) }}
              <ElIcon @click="deleteButton(right)" class="ml-1 button-close"><Close /></ElIcon>
            </ElButton>
          </div>
        </ElScrollbar>
        <ElButton type="primary" class="absolute right-0" @click="addButton">{{
          t('module.system.addButton')
        }}</ElButton>
      </ElFormItem>
      <ElDrawer v-model="addButtonVisible" :size="360">
        <template #header>
          <div>
            <ElButton :size="'default'" type="primary" @click="submitAddButton">
              {{ t('common.button.saveText') }}
            </ElButton>
          </div>
        </template>
        <ElForm ref="buttonFormRef" :model="buttonVal" :rules="buttonFormRules" label-width="120px">
          <ElFormItem :label="t('module.system.buttonId')" prop="buttonId">
            <ElInput v-model="buttonVal.buttonId"></ElInput>
          </ElFormItem>
          <ElFormItem :label="t('module.system.buttonName')" prop="buttonName">
            <ElInput v-model="buttonVal.buttonName"></ElInput>
          </ElFormItem>
        </ElForm>
      </ElDrawer>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import {
  ElDrawer,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton,
  ElScrollbar,
  ElTreeSelect,
  ElIcon,
  FormInstance,
  FormRules
} from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { Menu, MenuButton } from '#/list'
import { computed, PropType, reactive, ref, watch, unref } from 'vue'
import IconPicker from '@/components/icons/IconPicker.vue'
import { treeMap } from '@/hooks/tree'
import { useI18n } from '@/hooks/web/useI18n'
import { cloneDeep } from 'lodash-es'
import { TreeSelectInfo } from './info'
const props = defineProps({
  value: {
    type: Object as PropType<Menu>,
    default: () => ({})
  },
  menus: Array as PropType<Menu[]>,
  visible: Boolean
})

const emits = defineEmits<{
  (e: 'save', menu: Menu, oldMenu: Menu): void
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

const menuVal = reactive(cloneDeep(props.value))
const menuFormRef = ref<FormInstance>()

const isDirectory = ref(true)

const addButtonVisible = ref(false)
// 按钮Form的校验规则
const buttonFormRules: FormRules = {
  buttonId: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {
      validator: (_rule, val, callback) => {
        const rights = unref(getRights)
        if (rights.length === 0) return
        const index = rights.findIndex((right) => right.buttonId === val)
        index !== -1 && callback(new Error('该按钮已存在'))
      },
      trigger: 'blur'
    }
  ],
  buttonName: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
}
const buttonFormRef = ref<FormInstance>()
const buttonVal = reactive<MenuButton>({
  buttonId: '',
  buttonName: ''
})

watch(
  () => props.visible,
  () => {
    Object.keys(menuVal).forEach((key) => (menuVal[key] = props.value[key]))
    menuVal.hideMenu = !!menuVal.hideMenu
    menuVal.fixedTab = !!menuVal.fixedTab
    isDirectory.value = !!props.value.redirect
  },
  { immediate: true }
)

const getTree = computed(() => {
  const tree = treeMap(props.menus || [], {
    conversion: (node: Menu) => {
      return {
        value: node.path,
        label: t(node.name)
      }
    }
  })
  return tree as unknown as TreeSelectInfo[]
})

// 所有按钮
const getRights = computed(() => {
  const buttons: MenuButton[] = []
  treeMap(props.menus || [], {
    conversion: (node: Menu) => {
      if (node.rights && node.rights.length) {
        buttons.push(...cloneDeep(node.rights))
      }
      return {}
    }
  })
  return buttons
})

// 添加按钮事件
function addButton() {
  const buttonFormEl = unref(buttonFormRef)
  buttonFormEl?.resetFields()
  addButtonVisible.value = true
}

// 按钮提交保存事件
function submitAddButton() {
  if (menuVal.rights) {
    menuVal.rights.push(cloneDeep(buttonVal))
  } else {
    menuVal.rights = [cloneDeep(buttonVal)]
  }
  addButtonVisible.value = false
}

//  按钮删除事件
function deleteButton(button: MenuButton) {
  menuVal.rights = menuVal.rights?.filter((right) => right.buttonId !== button.buttonId)
}

// drawer保存事件
function handleSave() {
  console.log('props', props.value)
  emits('save', cloneDeep(menuVal), props.value)
  drawerVisible.value = false
}
</script>

<style lang="less" scoped>
.button {
  &-close {
    border-radius: 50%;
    transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
    width: 0px;

    &:hover {
      background-color: var(--el-text-color-placeholder);
      color: #fff;
    }
  }

  &:hover &-close {
    width: 1em;
  }
}
</style>
