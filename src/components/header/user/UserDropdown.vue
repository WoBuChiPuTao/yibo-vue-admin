<template>
    <ElDropdown>
        <span class="el-dropdown-link">
            Dropdown List
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :icon="Document">查看文档</el-dropdown-item>
                <el-dropdown-item :icon="Lock">锁定屏幕</el-dropdown-item>
                <el-dropdown-item @click="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </ElDropdown>
</template>

<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { Document, SwitchButton, Lock } from '@element-plus/icons-vue'

import { useUserStore } from '@/store/modules/user'
const { logout } = useUserStore()
</script>
