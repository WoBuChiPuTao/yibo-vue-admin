<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { createAppProvider } from './useAppContext'

const props = {
  appClass: {
    type: String,
    default: 'person'
  }
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false)

    const { appClass } = toRefs(props)

    createAppProvider({ appClass, isMobile })

    return () => slots.default?.()
  }
})
</script>
