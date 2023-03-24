import { defineComponent, ref } from 'vue'
import { ElDrawer, ElDivider } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import AppThemeToggle from '@/components/application/AppThemeToggle.vue'
import NavigationPicker from './components/NavigationPicker.vue'
import ColorPicker from './components/ColorPicker.vue'

export const drawerVisibile = ref(false)

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { t } = useI18n()

    function rendererHeader() {
      return <div>{() => t('common.setting.drawerTitle')}</div>
    }

    function rendererBody() {
      return (
        <>
          <ElDivider>{() => t('common.setting.darkMode')}</ElDivider>
          <AppThemeToggle class="mode-center"></AppThemeToggle>
          <ElDivider>{() => t('common.setting.navMode')}</ElDivider>
          <NavigationPicker></NavigationPicker>
          <ElDivider>{() => t('common.setting.sysTheme')}</ElDivider>
          <ColorPicker></ColorPicker>
        </>
      )
    }

    return () => (
      <ElDrawer
        {...attrs}
        v-model={drawerVisibile.value}
        style={{ maxWidth: '400px', minWidth: '300px' }}
      >
        {{ header: () => rendererHeader(), default: () => rendererBody() }}
      </ElDrawer>
    )
  }
})
