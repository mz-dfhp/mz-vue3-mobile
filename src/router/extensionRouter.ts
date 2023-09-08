import type { RouteLocationNormalized, Router } from 'vue-router'
import { settingStoreWithout } from '@/store/setting'
import { tabbarRoutesPathList } from '@/router'

const settingStore = settingStoreWithout()
/**
 * @description: router 扩展
 * @param {Router} router
 * @return {*}
 */
export function extensionRouter(router: Router) {
  const replace = router.replace
  const back = router.back
  const push = router.push

  router.push = function (arg: RouteLocationNormalized) {
    if (tabbarRoutesPathList.includes(arg.path))
      setAppTransitionName('none')
    else
      setAppTransitionName('enter-slide')

    return push.call(router, arg)
  }

  router.replace = function (arg: RouteLocationNormalized) {
    return replace.call(router, arg)
  }

  router.back = function () {
    setAppTransitionName('slide-back')
    back()
  }
}

// 三种情况
// 1. 进入详情 详情滑进来
// 2. 返回 详情滑出去
// 3. 跳转tabbar页面 清空 transitionName
function setAppTransitionName(name: 'enter-slide' | 'slide-back' | 'none') {
  settingStore.setTransitionName(name)
}
