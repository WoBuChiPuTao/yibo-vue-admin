<template>
  <ElDropdown v-if="getShowPicker" trigger="click" @command="toggleLocale" tabindex="0">
    <div class="container">
      <EIcon class="picker-content" icon="ion:language" :post-icon="languageIcon"></EIcon>
      <span v-if="showText" class="picker-content-title">{{ getLocaleText }}</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <template v-for="item in localeList" :key="item.event">
          <ElDropdownItem
            :command="item.event"
            :class="
              item.event === getLocale
                ? getThemeMode === 'dark'
                  ? 'picker-selected-dark'
                  : 'picker-selected-light'
                : ''
            "
          >
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
import { LocaleType } from '#/store'
import { useLocale } from '@/locales/useLocale'
import { computed, ref, unref, watchEffect } from 'vue'
import { localeList } from '@/settings/locale'
import { isEmpty } from '@/utils/is'
import { useThemeMode } from '@/hooks/setting/useTheme'
// 图标
import languageIcon from '@iconify-icons/ion/language'

const selectedKey = ref<LocaleType>('zh-CN')

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

const { getShowPicker, getLocale, changeLocale } = useLocale()
const { getThemeMode } = useThemeMode()

const getLocaleText = computed(() => {
  const key = selectedKey.value
  if (isEmpty(key)) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKey.value = unref(getLocale)
})

async function toggleLocale(lang: LocaleType) {
  if (lang === unref(getLocale)) {
    return
  }
  await changeLocale(lang)
  selectedKey.value = lang
  props.reload && location.reload()
}
</script>

<style lang="less" scoped>
.container {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  // width: 100%;
  // position: relative;

  .picker-content {
    font-style: normal;

    &-title {
      font-size: 1rem;
    }
  }
}

:deep(.picker-selected-light) {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary) !important;
}

:deep(.picker-selected-dark) {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary) !important;
}
</style>
