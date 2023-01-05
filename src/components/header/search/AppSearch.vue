<template>
    <ElTooltip content="搜索">
        <ElIcon size="20px" :class="$attrs.class">
            <Search />
        </ElIcon>
    </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'AppSearch',
    components: { ElIcon, Search, ElTooltip },
    setup() {
        return {
        }
    }
})
</script>
