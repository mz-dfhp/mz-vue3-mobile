import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { keepAliveStore } from '@/store/keepAlive'
import 'nprogress/nprogress.css'

export function createRouterPermissions(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    to.meta.title && (document.title = to.meta.title as string)
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
