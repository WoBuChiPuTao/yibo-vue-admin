import { defineComponent, ref, unref } from 'vue'
import { ElDrawer, ElDivider } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { SYS_COLOR_LIST, HEADER_BG_COLOR_LIST, SIDE_COLOR_LIST } from '@/settings/sysColor'
import { useSiderSetting } from './useSetting'
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
      const {
        getSiderColor,
        getHeaderColor,
        getMainColor,
        setSiderColor,
        setHeaderColor,
        setMainColor
      } = useSiderSetting()
      return (
        <>
          <ElDivider>{() => t('common.setting.darkMode')}</ElDivider>
          <AppThemeToggle class="mode-center"></AppThemeToggle>
          <ElDivider>{() => t('common.setting.navMode')}</ElDivider>
          <NavigationPicker></NavigationPicker>
          <ElDivider>{() => t('common.setting.sysTheme')}</ElDivider>
          <ColorPicker
            colorList={SYS_COLOR_LIST}
            activedTheme={unref(getMainColor).theme}
            onClickColor={setMainColor}
          ></ColorPicker>
          <ElDivider>{() => t('common.setting.sideTheme')}</ElDivider>
          <ColorPicker
            colorList={SIDE_COLOR_LIST}
            activedTheme={unref(getSiderColor).theme}
            onClickColor={setSiderColor}
          ></ColorPicker>
          <ElDivider>{() => t('common.setting.headerTheme')}</ElDivider>
          <ColorPicker
            colorList={HEADER_BG_COLOR_LIST}
            activedTheme={unref(getHeaderColor).theme}
            onClickColor={setHeaderColor}
          ></ColorPicker>
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
