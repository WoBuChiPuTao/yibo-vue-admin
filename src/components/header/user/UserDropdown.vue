<template>
  <ElDropdown>
    <span class="header-user-dropdown">
      <img
        ref="headerImage"
        :src="
          isEmpty(getUserInfo.avatar) ? '/img/avatar.png' : getUserInfo.avatar
        "
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
        <el-dropdown-item :icon="SwitchButton" @click="toLogout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessage,
  ElMessageBox
} from 'element-plus'
import { Document, SwitchButton, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, ref } from 'vue'
import { isEmpty } from '@/utils/is'

const userStore = useUserStore()

const headerImage = ref<HTMLImageElement>()

const getUserInfo = computed(() => {
  const {
    username = 'nibabassssss',
    avatar,
    desc
  } = userStore.getUserInfo || {}
  return { username, avatar, desc }
})

const toLogout = () => {
  ElMessageBox.confirm('是否退出登录', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      userStore.logout(true)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消'
      })
    })
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
    font-size: 14px;
    color: rgb(134, 134, 134);
  }
}
</style>
