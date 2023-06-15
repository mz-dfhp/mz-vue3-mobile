import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouterPermissions } from './permissions'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    name: '/',
    component: () => import('@/views/index/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
        },
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
        meta: {
          title: '我的',
        },
      },
    ],
  },
]

const router = createRouter({
  history:
    import.meta.env.MODE === 'github-io'
      ? createWebHashHistory()
      : createWebHistory(),
  routes,
})
createRouterPermissions(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
