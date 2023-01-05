<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'breadCrumb',
    setup() {
        const getCollapsed = true
        return {
            getCollapsed
        }
    }
})
</script>
