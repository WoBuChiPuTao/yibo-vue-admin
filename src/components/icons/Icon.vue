<template>
  <span ref="iconRef" :class="$attrs.class"> </span>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, unref } from 'vue'
import Iconify from '@iconify/iconify'
export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const iconRef = ref<Element>()

    async function updateIcon() {
      const el = unref(iconRef)
      if (!el) return

      await nextTick()
      // eslint-disable-next-line no-useless-return
      if (!props.icon) return
      const svg = Iconify.renderSVG(props.icon, {})
      if (svg) {
        el.textContent = ''
        el.appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = props.icon
        el.textContent = ''
        el.appendChild(span)
      }
    }

    onMounted(() => {
      updateIcon()
    })

    return { iconRef }
  }
})
</script>
