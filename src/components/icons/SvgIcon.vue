<template>
  <svg :class="['svg-icon-base', $attrs.class, spin && 'svg-icon-spin']" aria-hidden="true">
    <use :xlink:href="getSvgId"></use>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const getSvgId = computed(() => {
      return `#icon-${props.name}`
    })

    return {
      getSvgId
    }
  }
})
</script>

<style lang="less">
.svg-icon-base {
  display: inline;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
