<template>
  <ElDropdown trigger="click" @command="toggleLocale" tabindex="0">
    <span class="picker-content">
      <EIcon icon="ion:language"></EIcon>
      <span v-if="showText" class="picker-content-title">{{
        getLocaleText
      }}</span>
    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <template v-for="item in localeList" :key="item.event">
          <ElDropdownItem :command="item.event" :class="item.event === getLocale ? 'picker-dropdown-item-selected' : ''">
            {{ item.text }}
          </ElDropdownItem>
        </template>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import EIcon from '../icons/EIcon.vue'
import { localeList, LocaleType } from '@/types/locale'
import { useLocale } from '@/locales/useLocale'
import { computed, ref, unref, watchEffect } from 'vue'

const selectedKeys = ref<string[]>([])

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: false },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean, default: true }
})

const { getLocale, changeLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}
</script>

<style lang="less">
.picker-content {
  cursor: pointer;
  display: flex;
  align-items: center;

  &-title {
    font-size: 16px;
  }
}

.el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: #f5f5f5;
  color: #606266;
}

.picker-dropdown-item-selected {
  background-color: #ecf5ff;
  color: #409eff !important;
}

</style>
