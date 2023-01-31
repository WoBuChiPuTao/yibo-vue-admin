<template>
  <div class="multiple-tabs">
    <ElTabs
      :model-value="activeKey"
      type="card"
      @tab-change="handleChange"
      @edit="handleEdit"
    >
      <template
        v-for="tab in getTabsList"
        :key="tab.query ? tab.fullPath : tab.path"
      >
        <ElTabPane :closable="true" :name="tab.query ? tab.fullPath : tab.path">
          <template #label>
            <TabContent
              :tab-item="tab"
              class="el-tabs__item__content"
              :is-active="
                tab.path === getActive || tab.fullPath === getActive
                  ? true
                  : false
              "
            ></TabContent>
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'

import { useTabStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useGo } from '@/hooks/web/usePage'
import { listenerRouteChange } from '@/hooks/mitt/routeChange'
import TabContent from './components/TabContent.vue'

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

function handleChange(tabname: any) {
  activeKey.value = tabname
  go(tabname, false)
}

function handleEdit(tabname: any) {
  tabStore.removeTabByKey(tabname, router)
}

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
