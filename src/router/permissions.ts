import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { keepAliveStore } from '@/store/keepAlive'
import 'nprogress/nprogress.css'

function setDocumentTitle(title?: string) {
  title && (document.title = title as string)
}

export function createRouterPermissions(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    setDocumentTitle(to.meta.title)
    next()
  })

  router.afterEach((to) => {
    const keepAliveStoreInstance = keepAliveStore()
    if (to.meta.keepAlive)
      keepAliveStoreInstance.addkeepAlive(to.name as string)

    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
