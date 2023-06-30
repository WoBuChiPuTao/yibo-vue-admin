<template>
  <!-- 此图标选择选择器只适应在线环境 -->
  <ElInput v-model="selectedIcon">
    <template #append>
      <ElPopover trigger="click" :width="250">
        <template #reference>
          <EIcon
            class="cursor-pointer"
            :icon="selectedIcon || 'ion:apps-outline'"
            mode="online"
          ></EIcon>
        </template>
        <template #default>
          <div v-if="getCurrentIcons.length">
            <ElScrollbar :max-height="200" class="border border-t-0 border-solid">
              <ul class="flex flex-wrap justify-around px-2">
                <li
                  v-for="icon in getCurrentIcons"
                  :key="icon"
                  :class="selectedIcon === icon ? 'border border-primary' : ''"
                  class="flex items-center justify-center p-2 mt-1 mr-1 border border-solid cursor-pointer w-1/8 hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <EIcon :icon="icon" mode="online" />
                </li>
              </ul>
            </ElScrollbar>
            <div
              class="flex items-center justify-center py-2"
              v-if="pageInfo.total >= pageInfo.size"
            >
              <ElPagination
                small
                v-model:current-page="pageInfo.current"
                v-model:page-size="pageInfo.size"
                :total="pageInfo.total"
                background
                layout="prev,jumper,next"
              >
              </ElPagination>
            </div>
          </div>
          <template
            ><div class="p-5"><ElEmpty /></div>
          </template>
        </template>
      </ElPopover>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import { ElInput, ElPopover, ElPagination, ElEmpty, ElScrollbar } from 'element-plus'
import { computed, reactive } from 'vue'
import EIcon from './EIcon.vue'
import antIcon from './data/ant-design-icon'

const props = defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])

const icons = getIcons()

const selectedIcon = computed({
  set: (val) => {
    emits('update:modelValue', val)
  },
  get: () => props.modelValue || ''
})

const pageInfo = reactive({ current: 1, size: 100, total: icons.length })

const getCurrentIcons = computed(() => {
  return icons.slice((pageInfo.current - 1) * pageInfo.size, pageInfo.current * pageInfo.size)
})

function getIcons() {
  const data = antIcon as { prefix: string; icons: string[] }
  const prefix: string = data?.prefix ?? ''
  let result: string[] = []
  if (prefix) {
    result = (data?.icons ?? []).map((item) => `${prefix}:${item}`)
  } else if (Array.isArray(antIcon)) {
    result = antIcon as string[]
  }
  return result
}

function handleClick(icon: string) {
  emits('update:modelValue', icon)
}
</script>

<style lang="less" scoped>
:deep(.el-pagination__jump) {
  margin-left: 0px;
}
</style>
