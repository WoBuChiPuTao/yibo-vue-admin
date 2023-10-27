<template>
  <div class="flex items-center justify-center">
    {{ t('module.system.menuAssign') }}
    <ElDropdown>
      <ElIcon class="ml-1"><More /></ElIcon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="setAllExpand">{{
            t('module.system.showMore')
          }}</el-dropdown-item>
          <el-dropdown-item @click="setAllFold">{{
            t('module.system.collapseAll')
          }}</el-dropdown-item>
          <el-dropdown-item @click="checkedAll" divided>{{
            t('module.system.selectAll')
          }}</el-dropdown-item>
          <el-dropdown-item @click="decheckedAll">{{
            t('module.system.deselectAll')
          }}</el-dropdown-item>
          <el-dropdown-item @click="checkStrictly" divided>{{
            t('module.system.levelAssociation')
          }}</el-dropdown-item>
          <el-dropdown-item @click="checkUnStrictly">{{
            t('module.system.levelIndependence')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </ElDropdown>
  </div>
  <ElDivider class="my-2" />
  <ElTree ref="treeRef" :data="getTree" show-checkbox node-key="path" :check-strictly="strictly">
    <template #default="{ data }">
      <div class="flex items-center">
        <EIcon :icon="data.icon"></EIcon>
        <span class="ml-1">{{ t(data.name) }}</span>
      </div>
    </template>
  </ElTree>
</template>

<script setup lang="ts">
import { ElTree, ElDivider, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { More } from '@element-plus/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'
import EIcon from '@/components/icons/EIcon.vue'
import { computed, nextTick, PropType, ref, unref, watch } from 'vue'
import { treeMap } from '@/hooks/tree'
import { Menu } from '#/list'

const props = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    default: () => []
  },
  selectedMenu: Array as PropType<Menu[]>,
  visible: Boolean
})

defineExpose({ getCurrentMenus })

const treeRef = ref<InstanceType<typeof ElTree>>()
const strictly = ref(false)

const { t } = useI18n()

watch(
  () => props.visible,
  () => {
    nextTick(() => {
      handleChecked(unref(getDefaultcheckedTree))
    })
  },
  {
    immediate: true
  }
)

const getTree = computed(() => {
  const getMenusTree = treeMap(props.menus, {
    conversion: (node: Menu) => {
      // 如果无chldren,且有rights,将rights作为子节点加入
      const haveChildren = Array.isArray(node.children) && node.children.length > 0
      if (!haveChildren && node.rights && node.rights.length) {
        return {
          ...node,
          children: node.rights.map((right) => ({
            path: right.buttonId,
            name: right.buttonName,
            type: 'button',
            parentPath: node.path
          }))
        }
      }
      return {
        ...node
      }
    }
  })
  return getMenusTree
})

const getDefaultcheckedTree = computed(() => {
  const checkedTree: { path: string | number; name: string; type: string }[] = []
  treeMap(props.selectedMenu || [], {
    conversion: (node: Menu) => {
      // 如果无chldren,且有rights,将rights作为子节点加入
      const haveChildren = Array.isArray(node.children) && node.children.length > 0
      if (!haveChildren && node.rights && node.rights.length) {
        checkedTree.push(
          ...node.rights.map((right) => ({
            path: right.buttonId,
            name: right.buttonName,
            type: 'button'
          }))
        )
      } else if (!haveChildren) {
        checkedTree.push({ path: node.path, name: node.name, type: 'menu' })
      }
    }
  })
  return checkedTree
})

// 折叠所有节点
function setAllFold() {
  handleExpand(false)
}
// 展开所有节点
function setAllExpand() {
  handleExpand(true)
}

// 展开/折叠事件
function handleExpand(isExpand: boolean) {
  const treeEl = unref(treeRef)
  if (!treeEl) return
  const nodes = treeEl.store.nodesMap
  for (const node in nodes) {
    nodes[node].expanded = isExpand
  }
}

// 全选
function checkedAll() {
  handleChecked(unref(getTree))
}

// 全不选
function decheckedAll() {
  handleChecked()
}

//  选择事件
function handleChecked(value: any = []) {
  const treeEl = unref(treeRef)
  if (!treeEl) return
  treeEl.setCheckedNodes(value)
}

// 层级关联
function checkStrictly() {
  strictly.value = false
}
// 层级独立
function checkUnStrictly() {
  strictly.value = true
}

// 得到被选中的菜单
function getCurrentMenus() {
  const treeEl = unref(treeRef)
  if (!treeEl) return
  const treeNodes = treeEl.getCheckedNodes()

  return treeMap(props.menus, {
    conversion: (menu: Menu) => {
      const reg = new RegExp(`${menu.path}`, 'g')
      const isExist =
        treeNodes.findIndex((node) => {
          return reg.test(node.path) || reg.test(node.parentPath)
        }) !== -1
      if (isExist) {
        return {
          ...menu,
          rights: menu.rights?.filter((right) => {
            return (
              treeNodes.findIndex((node) => {
                if (node.type === 'button') {
                  return right.buttonId === node.path
                }
                return false
              }) !== -1
            )
          })
        }
      }
    }
  })
}
</script>
