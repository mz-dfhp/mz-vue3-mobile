<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { tabbarRoutesPathList } from '@/router'
import { keepAliveStore } from '@/store/keepAlive'
import { settingStore } from '@/store/setting'

const router = useRouter()
const { keepList } = storeToRefs(keepAliveStore())
const { theme, transitionName } = storeToRefs(settingStore())
</script>

<template>
  <van-config-provider
    :theme="theme" :theme-vars="{ primaryColor: '#646cff' }" theme-vars-scope="global"
    style="overflow-x: hidden;"
  >
    <router-view v-slot="{ Component, route }">
      <van-nav-bar
        fixed placeholder :title="route.meta.title"
        z-index="9"
        style="--van-nav-bar-background: var(--van-primary-color);"
      >
        <template v-if="!tabbarRoutesPathList.includes(route.path)" #left>
          <van-icon name="arrow-left" color="#fff" size="28" @click="router.back()" />
        </template>
        <template #right>
          <van-icon
            name="exchange" color="#fff" size="28"
            @click="settingStore().setTheme(theme === 'dark' ? 'light' : 'dark')"
          />
        </template>
      </van-nav-bar>
      <transition :name="transitionName" appear>
        <keep-alive :include="keepList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
      <app-tabbar v-if="tabbarRoutesPathList.includes(route.path)" />
    </router-view>
  </van-config-provider>
</template>

<style lang="scss" scoped>
.enter-slide-enter-active {
  transition: all 0.4s ease;
  z-index: 1;
}

.enter-slide-enter-from {
  transform: translateX(100%);
}

.enter-slide-leave-active {
  position: fixed;
  transition: all 0.4s;
  z-index: 0;
}

.slide-back-leave-active {
  position: fixed;
  transform: translateX(100%);
  transition: all 0.4s ease;
  z-index: 1;
}
</style>
