<template>
    <ElTooltip :content="tooltipContent">
        <ElIcon size="20px" :class="$attrs.class" @click="toggle">
            <FullScreen></FullScreen>
        </ElIcon>
    </ElTooltip>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { FullScreen } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'FullScreenVue',
    components: { ElTooltip, ElIcon, FullScreen },
    setup() {
        const { isFullscreen, toggle } = useFullscreen()
        // 重新检查全屏状态
        isFullscreen.value = !!(
            document.fullscreenElement
        )
        const tooltipContent = computed(() => { return !unref(isFullscreen) ? '全屏模式' : '退出全屏' })
        return {
            isFullscreen,
            tooltipContent,
            toggle
        }
    }
})
</script>
