<template>
  <ElDrawer v-model="drawerVisible" :size="600" label-position="right">
    <template #header>
      <div>
        <ElButton :size="'default'" type="primary"> 保存 </ElButton>
      </div>
    </template>
    <ElForm :model="menuVal">
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
          <ElFormItem label="上级菜单">
            <ElTreeSelect
              v-model="menuVal.parentPath"
              :data="getTree"
              check-strictly
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
        <ElScrollbar always class="w-3/4 ml-4">
          <div class="flex items-center mb-3">
            <ElButton
              size="small"
              type="primary"
              bg
              text
              class="mr-1"
              v-for="right in menuVal.rights"
              :key="right.id"
            >
              {{ right.name }}
            </ElButton>
          </div>
        </ElScrollbar>
        <ElButton class="absolute right-0" @click="addButton">添加按钮</ElButton>
      </ElFormItem>
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
  ElTreeSelect
} from 'element-plus'
import { Menu } from '#/list'
import { computed, PropType, reactive, ref, watch } from 'vue'
import IconPicker from '@/components/icons/IconPicker.vue'
import { treeMap } from '@/hooks/tree'
import { useI18n } from '@/hooks/web/useI18n'
const props = defineProps({
  value: {
    type: Object as PropType<Menu>,
    default: () => ({})
  },
  menus: Array as PropType<Menu[]>,
  visible: Boolean
})

const emits = defineEmits(['update:value', 'update:visible'])

const { t } = useI18n()

const menuVal = reactive(props.value)

const isDirectory = ref(true)

watch(
  () => props.value.redirect,
  (val) => {
    console.log('val', val)
    isDirectory.value = !!val
  },
  { immediate: true }
)

const drawerVisible = computed<boolean>({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})

const getTree = computed(() => {
  return treeMap(props.menus || [], {
    conversion: (node: Menu) => {
      return {
        value: node.path,
        label: t(node.name)
      }
    }
  })
})

function addButton() {
  //
}
</script>
