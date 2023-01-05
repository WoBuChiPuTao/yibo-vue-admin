<template>
        <Fold v-if="getCollapsed"></Fold>
        <Expand v-else></Expand>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'SiderTrigger',
    components: { Fold, Expand },
    setup() {
        const getCollapsed = true
        return {
            getCollapsed
        }
    }
})
</script>
