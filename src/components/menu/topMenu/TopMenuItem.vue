<template>
  <ElSubMenu v-if="menu?.children && menu?.children.length !== 0" :index="menu.path">
    <template #title>
      <EIcon class="text-lg" v-if="parent" :icon="menu?.icon"></EIcon>
      <span class="ml-2"> {{ getI18nName }}</span>
    </template>
    <template v-for="item in menu.children" :key="item.path">
      <TopMenuItem :parent="false" :menu="item"></TopMenuItem>
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="menu.path">
    <template #title>
      <EIcon v-if="parent" :icon="menu?.icon"></EIcon>
      <span class="ml-2"> {{ getI18nName }}</span>
    </template>
  </ElMenuItem>
</template>

<script lang="ts">
import { Menu } from '#/list'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { computed, defineComponent, PropType } from 'vue'
import EIcon from '@/components/icons/EIcon.vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'TopMenuItem',
  components: { ElSubMenu, ElMenuItem, EIcon },
  props: {
    menu: {
      type: Object as PropType<Menu>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    parent: Boolean
  },
  setup(props) {
    const { t } = useI18n()

    const getI18nName = computed(() => {
      return t(props.menu.name)
    })
    return { getI18nName }
  }
})
</script>
