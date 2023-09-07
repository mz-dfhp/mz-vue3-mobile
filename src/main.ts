import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/style/index.scss'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import { setupStore } from '@/store'
import { setupRouter } from '@/router'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
}
setupApp()
app.mount('#app')
