<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const active = ref('/home')
const route = useRoute()
const router = useRouter()

const tabbarList = [{
  name: '/home',
  label: '主页',
  icon: 'home-o',
}, {
  name: '/about',
  label: '关于',
  icon: 'search',
}, {
  name: '/my',
  label: '我的',
  icon: 'friends-o',
}]

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
  <div class="wrapper">
    <router-view class="container" />
    <van-tabbar v-model="active" fixed placeholder @change="onChange">
      <van-tabbar-item
        v-for="(item, index) in tabbarList" :key="index" :name="item.name"
        :icon="item.icon"
      >
        {{ item.label }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  .container{
    flex: 1;
    overflow-y: auto;
    width: 100%;
  }
}
</style>
