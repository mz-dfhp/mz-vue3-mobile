import type { App } from 'vue'

export function setupPlugins(app: App<Element>) {
  app.config.globalProperties.aa = 'a'
}
