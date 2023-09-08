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
    style="height: 100%;width: 100%;"
  >
    <router-view v-slot="{ Component, route }">
      <van-nav-bar
        placeholder
        :title="route.meta.title"
        style="--van-nav-bar-background: var(--van-primary-color);"
      >
        <template v-if="!tabbarRoutesPathList.includes(route.path)" #left>
          <van-icon name="arrow-left" color="#fff" size="28" @click="router.back()" />
        </template>
        <template #right>
          <van-icon name="exchange" color="#fff" size="28" @click="settingStore().setTheme(theme === 'dark' ? 'light' : 'dark')" />
        </template>
      </van-nav-bar>
      <transition :name="transitionName">
        <keep-alive :include="keepList">
          <component :is="Component" :key="route.fullPath" style="position: fixed;" />
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
.enter-slide-enter-from{
  transform: translateX(100%);
}

.enter-slide-leave-active{
  transition: all 0.4s;
  z-index: 0;
}

.slide-back-leave-active {
  transform: translateX(100%);
  transition: all 0.4s ease;
  z-index: 1;
}
</style>
