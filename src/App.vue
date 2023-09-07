<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { tabbarRoutesPathList } from '@/router'
import { keepAliveStore } from '@/store/keepAlive'
import { settingStore } from '@/store/setting'

const { keepList } = storeToRefs(keepAliveStore())
const { theme } = storeToRefs(settingStore())
</script>

<template>
  <van-config-provider
    :theme="theme" :theme-vars="{ primaryColor: '#5654b5' }"
    theme-vars-scope="global"
    style="height: 100%;width: 100%;overflow: hidden;"
  >
    <van-nav-bar
      fixed
      placeholder
      style="--van-nav-bar-background: var(--van-primary-color);"
    >
      <template #right>
        <van-icon name="exchange" size="28" @click="settingStore().setTheme(theme === 'dark' ? 'light' : 'dark')" />
      </template>
    </van-nav-bar>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade-transform" appear>
        <keep-alive :include="keepList">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
      <app-tabbar v-if="tabbarRoutesPathList.includes(route.path)" />
    </router-view>
  </van-config-provider>
</template>

<style scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
