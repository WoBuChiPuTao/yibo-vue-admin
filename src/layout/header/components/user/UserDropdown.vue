<template>
  <ElDropdown>
    <span class="header-user-dropdown">
      <img
        ref="headerImage"
        :src="isEmpty(getUserInfo.avatar) ? '/img/avatar.png' : getUserInfo.avatar"
        alt="avatar"
        class="header-user-dropdown-avatar"
      />
      <span class="header-user-dropdown-name">
        {{ getUserInfo.username }}
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Document">查看文档</el-dropdown-item>
        <el-dropdown-item :icon="Lock">锁定屏幕</el-dropdown-item>
        <el-dropdown-item :icon="SwitchButton" @click="toLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { Document, SwitchButton, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, ref, h } from 'vue'
import { isEmpty } from '@/utils/is'
import { useI18n } from '@/hooks/web/useI18n'

const userStore = useUserStore()
const { t } = useI18n()

const headerImage = ref<HTMLImageElement>()

const getUserInfo = computed(() => {
  const { username = 'nibabassssss', avatar, desc } = userStore.getUserInfo || {}
  return { username, avatar, desc }
})

async function toLogout() {
  try {
    await ElMessageBox.confirm(
      () => h('span', t('sys.app.logoutMessage')),
      t('sys.app.logoutTip'),
      {
        confirmButtonText: t('common.okText'),
        cancelButtonText: t('common.cancelText'),
        type: 'warning'
      }
    )
    await userStore.logout(true)
  } catch (error) {}
}
</script>

<style lang="less">
@import '/src/style/var/index.less';

.header-user-dropdown {
  display: flex;
  height: @header-height;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &-avatar {
    border-radius: 50%;
  }

  &-name {
    font-size: 1rem;
    line-height: @header-height;
  }
}
</style>
