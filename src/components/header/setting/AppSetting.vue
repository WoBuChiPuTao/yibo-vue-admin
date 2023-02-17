<template>
    <ElTooltip content="设置">
        <ElIcon :class="$attrs.class">
            <Setting></Setting>
        </ElIcon>
    </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'

export default defineComponent({
    name: 'AppSetting',
    components: { ElIcon, Setting, ElTooltip },
    setup() {
        return {
        }
    }
})
</script>
