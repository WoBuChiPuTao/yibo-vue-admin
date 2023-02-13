import { defineStore } from 'pinia'
import type {
  RouteLocationNormalized,
  Router,
  RouteLocationRaw
} from 'vue-router'
import { getRawRoute } from '@/hooks/route'
import { useRedo, useGo } from '@/hooks/web/usePage'
import { unref, toRaw } from 'vue'
import { PageEnum } from '@/types/enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { WebCache } from '@/utils/cache'

interface TabState {
  cacheList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragIndex: number
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {}
  }
}

function handleGoPage(router: Router) {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

export const useTabStore = defineStore({
  id: 'app-tabs',
  state: (): TabState => ({
    cacheList: new Set(),
    tabList: WebCache.getLocal('Tabs') || [],
    lastDragIndex: 0
  }),
  getters: {
    getCacheList(): string[] {
      return Array.from(this.cacheList)
    },
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getLastDragIndex(): number {
      return this.lastDragIndex
    }
  },
  actions: {
    /**
     * @description:根据当前打开的选项卡更新缓存
     */
    async updateCacheTab() {
      const cacheSet: Set<string> = new Set()
      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        const name = item.name
        cacheSet.add(name as string)
      }
      this.cacheList = cacheSet
    },
    /**
     * @description: 刷新页面
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router
      const route = unref(currentRoute)

      const findTab = this.getCacheList.find((item) => item === route.name)
      if (findTab) {
        this.cacheList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },

    clearCacheList() {
      this.cacheList = new Set()
    },

    resetState() {
      this.tabList = []
      this.clearCacheList()
    },
    /**
     *@description: 跳转页面
     */
    async goPage(router: Router) {
      const go = useGo(router)
      const len = this.tabList.length
      const { path } = unref(router.currentRoute)

      let toPath: PageEnum | string = PageEnum.BASE_HOME

      if (len > 0) {
        const page = this.tabList[len - 1]
        const p = page.fullPath || page.path
        if (p) {
          toPath = p
        }
      }
      path !== toPath && go(toPath, true)
    },
    /**
     *@description: add tab
     */
    async addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query } = getRawRoute(route)
      // 404  The page does not need to add a tab
      if (
        path === PageEnum.ERROR_PAGE ||
        path === PageEnum.BASE_LOGIN ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(
          name as string
        )
      ) {
        return
      }

      let updateIndex = -1
      // Existing pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        this.tabList.push(route)
      }
      this.updateCacheTab()
      WebCache.setLocal('Tabs', this.tabList)
    },

    async removeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { fixedTab } = {} } = route
        if (fixedTab) {
          return
        }
        const index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath
        )
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)
      if (path !== tab.path) {
        // Closed is not the activation tab
        close(tab)
        this.updateCacheTab()
        return
      }

      // Closed is activated atb
      let toTarget: RouteLocationRaw = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          // const userStore = useUserStore()
          toTarget = PageEnum.BASE_HOME
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      // Close the current tab
      close(currentRoute.value)
      await replace(toTarget)
    },

    async removeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex(
        (item) => (item.fullPath || item.path) === key
      )
      if (index !== -1) {
        await this.removeTab(this.tabList[index], router)
        const { currentRoute, replace } = router
        // 检查当前路由是否存在于tabList中
        const isActivated = this.tabList.findIndex((item) => {
          return item.fullPath === currentRoute.value.fullPath
        })
        // 如果当前路由不存在于TabList中，尝试切换到其它路由
        if (isActivated === -1) {
          let pageIndex
          if (index > 0) {
            pageIndex = index - 1
          } else if (index < this.tabList.length - 1) {
            pageIndex = index + 1
          } else {
            pageIndex = -1
          }
          if (pageIndex >= 0) {
            const page = this.tabList[index - 1]
            const toTarget = getToTarget(page)
            await replace(toTarget)
          }
        }
      }
    },

    /**
     * remove tabs in bulk
     */
    async bulkRemoveTabs(pathList: string[]) {
      this.tabList = this.tabList.filter(
        (item) => !pathList.includes(item.fullPath)
      )
    },

    /**
     * @description: Sort the tabs
     */
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex]
      this.tabList.splice(oldIndex, 1)
      this.tabList.splice(newIndex, 0, currentTab)
      this.lastDragIndex = this.lastDragIndex + 1
    },

    async removeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.path === route.path)

      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index)
        const pathList: string[] = []
        for (const item of leftTabs) {
          const fixedTab = item?.meta?.fixedTab ?? false
          if (!fixedTab) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkRemoveTabs(pathList)
      }
      this.updateCacheTab()
      handleGoPage(router)
    },

    async removeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(
        (item) => item.fullPath === route.fullPath
      )

      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length)

        const pathList: string[] = []
        for (const item of rightTabs) {
          const fixedTab = item?.meta?.fixedTab ?? false
          if (!fixedTab) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkRemoveTabs(pathList)
      }
      this.updateCacheTab()
      handleGoPage(router)
    },

    async removeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath)

      const pathList: string[] = []

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path)
          if (!closeItem) {
            continue
          }
          const fixedTab = closeItem?.meta?.fixedTab ?? false
          if (!fixedTab) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkRemoveTabs(pathList)
      this.updateCacheTab()
      handleGoPage(router)
    },

    async removeAllTabs(router: Router) {
      this.tabList = this.tabList.filter(
        (item) => item?.meta?.fixedTab ?? false
      )
      this.clearCacheList()
      this.goPage(router)
    },

    /**
     * Set tab's title
     */
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.meta.title = title
        await this.updateCacheTab()
      }
    },
    /**
     * replace tab's path
     */
    async updateTabPath(fullPath: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.fullPath = fullPath
        findTab.path = fullPath
        await this.updateCacheTab()
      }
    }
  }
})
