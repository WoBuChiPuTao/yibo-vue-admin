import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EIcon',
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  setup(props, { attrs }) {
    return () => <span class={attrs.class}></span>
  }
})
