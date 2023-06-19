import type { App } from 'vue'
import './vant'
import { setupGlobal } from './global'

export function setupPlugins(app: App<Element>) {
  setupGlobal(app)
}
