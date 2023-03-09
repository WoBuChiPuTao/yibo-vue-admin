import { defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

export default defineComponent({
  name: 'SettingDrawer',
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    return () => (
      <ElDrawer {...attrs} v-model={props.drawerVisible}>
        <template v-slot:header></template>
        <template v-slot:default></template>
      </ElDrawer>
    )
  }
})
