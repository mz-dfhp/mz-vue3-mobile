import type { App } from 'vue'

export function setupGlobal(app: App<Element>) {
  app.config.globalProperties.aa = 'a'
}
