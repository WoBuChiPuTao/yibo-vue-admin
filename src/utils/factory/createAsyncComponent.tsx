/* eslint-disable @typescript-eslint/no-empty-function */
import { ElLoading } from 'element-plus'
import { defineAsyncComponent } from 'vue'

interface Options {
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}

export const noop = () => {}

export function createAsyncComponent(loader: Fn, Options: Options = {}) {
  const {
    delay = 100,
    timeout = 30000,
    loading = false,
    retry = true
  } = Options
  console.log('assasas' + delay)
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? ElLoading : undefined,
    delay,
    timeout,
    /**
     *
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: retry
      ? (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // retry on fetch errors, 3 max attempts
            retry()
          } else {
            // Note that retry/fail are like resolve/reject of a promise:
            // one of them must be called for the error handling to continue.
            fail()
          }
        }
      : noop
  })
}