<template>
  <div class="p-4">
    <div class="flex">
      <div class="pr-4 flex-col-75">
        <Card>
          <WokerHeader class="mb-8"></WokerHeader>
          <ElDivider></ElDivider>
          <WorkerProject></WorkerProject>
        </Card>
      </div>
      <div class="flex flex-col justify-between flex-col-25 enter-y">
        <QuickAccess title="快捷访问" :access-list="accessItems"></QuickAccess>
        <QuickAccess title="最近访问" :access-list="accessItems"></QuickAccess>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDivider } from 'element-plus'
import Card from '@/components/card/Card.vue'
import WokerHeader from './components/WokerHeader.vue'
import WorkerProject from './components/WorkerProject.vue'
import QuickAccess from './components/QuickAccess.vue'
import { accessItems } from './data'

export default defineComponent({
  name: 'Workbench',
  components: { Card, WokerHeader, ElDivider, WorkerProject, QuickAccess },
  setup() {
    return {
      accessItems
    }
  }
})
</script>

<style lang="less" scoped>
.flex-col-75 {
  max-width: 75%;
  flex: 0 0 75%;
}

.flex-col-25 {
  max-width: 25%;
  flex: 0 0 25%;
}
</style>
