import { PageEnum } from '@/enums/pageEnum'
import { unref } from 'vue'
import { RouteLocationRaw, Router, useRouter } from 'vue-router'

export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: PageEnum } : T
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

function handleError(e: Error) {
  console.error(e)
}

/**
 * page switch
 */
export function useGo(router?: Router) {
  const { push, replace } = router || useRouter()
  function go(opt: RouteLocationRawEx = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }
  return go
}

/**
 * @description: redo current page
 */

export function useRedo(router?: Router) {
  const { replace, currentRoute } = router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  function redo(): Promise<boolean> {
    // eslint-disable-next-line promise/param-names
    return new Promise((reslove) => {
      if (name === 'Redirect') {
        reslove(false)
      }
      if (name && Object.keys(params).length > 0) {
        params['redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['redirect_type'] = 'path'
        params['path'] = fullPath
      }
      replace({ name: 'Redirect', params, query }).then(() => reslove(true))
    })
  }
  return redo
}
