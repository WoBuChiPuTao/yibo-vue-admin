import { computed } from 'vue'
import { useRouter } from 'vue-router'

export function useRights() {
  const { currentRoute } = useRouter()
  return computed(() => {
    return currentRoute.value.meta.rights || []
  })
}
