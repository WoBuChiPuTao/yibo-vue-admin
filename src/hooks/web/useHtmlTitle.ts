import { useLocaleStore } from '@/store/modules/locale'
import { useTitle } from '@vueuse/core'
import { unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from './useI18n'

export function useHtmlTitle() {
  const { t } = useI18n()
  const { currentRoute } = useRouter()
  const localeStore = useLocaleStore()

  const pageTitle = useTitle()

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute)
      if (route.name === 'Redirect') {
        return
      }
      const title = t((route?.meta?.title || 'common.appTitle') as string)
      pageTitle.value = title
        ? `${title}-${process.env.VUE_APP_SIMPLE_TITLE}`
        : `${process.env.VUE_APP_SIMPLE_TITLE}`
    },
    {
      immediate: true
    }
  )
}
