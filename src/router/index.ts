import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'
import { extensionRouter } from './extensionRouter'

export const tabbarRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home-o',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
      icon: 'search',
    },
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/index.vue'),
    meta: {
      title: '我的',
      icon: 'friends-o',
    },
  },
]

export const tabbarRoutesPathList = tabbarRoutes.map(item => item.path)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/component',
    name: 'Component',
    component: () => import('@/views/home/component.vue'),
    meta: {
      title: '组件',
    },
  },
  ...tabbarRoutes,
]

const router = createRouter({
  history:
    import.meta.env.MODE === 'github-io'
      ? createWebHashHistory()
      : createWebHistory(),
  routes,
})

extensionRouter(router)
createRouterPermissions(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
