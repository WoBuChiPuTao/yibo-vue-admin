import useAuthStore from './modules/user'

import type { App } from 'vue'
import { createPinia } from 'pinia'

export { useAuthStore }

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
