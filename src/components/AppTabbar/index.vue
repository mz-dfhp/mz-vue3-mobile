<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tabbarRoutes } from '@/router'

const active = ref(tabbarRoutes[0].path)
const route = useRoute()
const router = useRouter()

function onChange(path: string) {
  router.push({
    path,
  })
}

onMounted(() => {
  active.value = route.path
})
</script>

<template>
  <van-tabbar v-model="active" fixed placeholder @change="onChange">
    <van-tabbar-item
      v-for="(item, index) in tabbarRoutes" :key="index" :name="item.path"
      :icon="item.meta.icon"
    >
      {{ item.meta.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss">
</style>
