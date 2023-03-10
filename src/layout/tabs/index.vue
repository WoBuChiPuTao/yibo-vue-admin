<template>
  <div class="multiple-tabs">
    <ElTabs :model-value="activeKey" type="card" @tab-click="handleClick" @edit="handleEdit">
      <template v-for="tab in getTabsList" :key="tab.query ? tab.fullPath : tab.path">
        <ElTabPane
          :closable="!(tab && tab.meta && tab.meta.fixedTab)"
          :name="tab.query ? tab.fullPath : tab.path"
        >
          <template #label>
            <TabContent
              :tab-item="tab"
              class="el-tabs__item__content"
              :is-active="tab.path === getActive || tab.fullPath === getActive ? true : false"
            ></TabContent>
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane, TabsPaneContext } from 'element-plus'

import { useTabStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useGo } from '@/hooks/web/usePage'
import { listenerRouteChange } from '@/hooks/mitt/routeChange'
import TabContent from './components/TabContent.vue'
import { useTabsDarg } from './useTabsDrag'

const tabStore = useTabStore()
const userStore = useUserStore()
const router = useRouter()
const go = useGo()

const activeKey = ref('')
const getTabsList = computed(() => {
  return tabStore.getTabList
})
const getActive = computed(() => {
  return activeKey.value
})

function handleClick(tabContext: TabsPaneContext) {
  if (!tabContext.active) {
    activeKey.value = tabContext.paneName as string
    go(activeKey.value, false)
  }
}

function handleEdit(tabname: any) {
  tabStore.removeTabByKey(tabname, router)
}

useTabsDarg()

listenerRouteChange((route) => {
  const { name } = route
  if (name === 'Redirect' || !route || !userStore.getToken) {
    return
  }
  const { path, fullPath } = route
  const temp = fullPath || path
  if (activeKey.value !== temp) {
    activeKey.value = temp as string
  }
  tabStore.addTab(unref(route))
})
</script>

<style lang="less">
@import './index.less';
</style>
