<template>
  <ElDropdown>
    <span class="header-user-dropdown">
      <img :src="getUserInfo.avatar" alt="avatar" class="header-user-dropdown-avatar" />
      <span class="truncate header-user-dropdown-name">
        {{ getUserInfo.userName }}
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Document"
          ><a
            href="https://github.com/WoBuChiPuTao/yibo-vue-admin"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t('common.header.dropdownItemDoc') }}</a
          ></el-dropdown-item
        >
        <el-dropdown-item :icon="SwitchButton" @click="toLogout">{{
          t('common.header.dropdownItemLoginOut')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { Document, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, h } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import headerImg from '@/assets/img/avatar.jpg'

const userStore = useUserStore()
const { t } = useI18n()

const getUserInfo = computed(() => {
  const { userName, avatar, remarks } = userStore.getUserInfo || {}
  return { userName, avatar: avatar || headerImg, remarks }
})
async function toLogout() {
  try {
    await ElMessageBox.confirm(
      () => h('span', t('sys.app.logoutMessage')),
      t('sys.app.logoutTip'),
      {
        confirmButtonText: t('common.button.okText'),
        cancelButtonText: t('common.button.cancelText'),
        type: 'warning'
      }
    )
    await userStore.logout(true)
  } catch (error) {}
}
</script>

<style lang="less">
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
