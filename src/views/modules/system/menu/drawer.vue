<template>
  <ElDrawer v-model="drawerVisible" :size="600">
    <template #header>
      <div>
        <ElButton :size="'default'" type="primary" @click="handleSave"> 保存 </ElButton>
      </div>
    </template>
    <ElForm ref="menuFormRef" :model="menuVal" label-width="80px">
      <ElRow :gutter="12">
        <ElCol :span="24" class="mb-4">
          <ElRadioGroup v-model="isDirectory">
            <ElRadioButton :label="true">目录</ElRadioButton>
            <ElRadioButton :label="false">菜单</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
      </ElRow>
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="菜单名称">
            <ElInput v-model="menuVal.name"></ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="上级目录">
            <ElTreeSelect
              v-model="menuVal.parentPath"
              :data="getTree"
              check-strictly
              clearable
              :default-expanded-keys="[menuVal.parentPath || '']"
            ></ElTreeSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="路由地址">
            <ElInput v-model="menuVal.path"></ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="路由名称">
            <ElInput v-model="menuVal.routeName"></ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem label="菜单权重">
            <ElInputNumber v-model="menuVal.orderNo" :style="{ width: '100%' }" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="菜单图案">
            <IconPicker v-if="typeof menuVal.icon !== 'object'" v-model="menuVal.icon">
            </IconPicker>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="12">
        <ElCol v-if="isDirectory" :span="12">
          <ElFormItem label="重定向">
            <ElInput v-model="menuVal.redirect"></ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="隐藏菜单">
            <ElRadioGroup v-model="menuVal.hideMenu">
              <ElRadioButton :label="true">是</ElRadioButton>
              <ElRadioButton :label="false">否</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElFormItem label="按钮" v-if="!isDirectory">
        <ElScrollbar class="w-3/4">
          <div class="flex items-center mb-3 h-9">
            <ElButton
              size="small"
              type="primary"
              bg
              text
              class="mr-1 button"
              v-for="right in menuVal.rights"
              :key="right.id"
            >
              {{ right.name }}
              <ElIcon @click="deleteButton(right)" class="ml-1 button-close"><Close /></ElIcon>
            </ElButton>
          </div>
        </ElScrollbar>
        <ElButton type="primary" class="absolute right-0" @click="addButton">添加按钮</ElButton>
      </ElFormItem>
      <ElDrawer v-model="addButtonVisible" :size="300">
        <template #header>
          <div>
            <ElButton :size="'default'" type="primary" @click="submitAddButton"> 保存 </ElButton>
          </div>
        </template>
        <ElForm ref="buttonFormRef" :model="buttonVal" :rules="buttonFormRules">
          <ElFormItem label="按钮标识" prop="id">
            <ElInput v-model="buttonVal.id"></ElInput>
          </ElFormItem>
          <ElFormItem label="按钮名称" prop="name">
            <ElInput v-model="buttonVal.name"></ElInput>
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
  id: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {
      validator: (_rule, val, callback) => {
        const rights = unref(getRights)
        if (rights.length === 0) return
        const index = rights.findIndex((right) => right.id === val)
        index !== -1 && callback(new Error('该按钮已存在'))
      },
      trigger: 'blur'
    }
  ],
  name: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
}
const buttonFormRef = ref<FormInstance>()
const buttonVal = reactive<MenuButton>({
  id: '',
  name: ''
})

watch(
  () => props.visible,
  () => {
    Object.keys(menuVal).forEach((key) => (menuVal[key] = props.value[key]))
    menuVal.hideMenu = !!menuVal.hideMenu
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
  menuVal.rights = menuVal.rights?.filter((right) => right.id !== button.id)
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
