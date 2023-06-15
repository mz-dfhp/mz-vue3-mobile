<script setup lang="ts" name="AppMain">
import { storeToRefs } from 'pinia'
import { keepAliveStore } from '@/store/keepAlive'

const { keepList } = storeToRefs(keepAliveStore())
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" appear>
      <keep-alive :include="keepList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
</style>
