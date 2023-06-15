<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const active = ref('/home')
const route = useRoute()
const router = useRouter()
const navigationList = [{
  name: '/home',
  label: '主页',
  icon: 'home',
}, {
  name: '/about',
  label: '关于',
  icon: 'heart',
}, {
  name: '/my',
  label: '我的',
  icon: 'account-circle',
}]
onMounted(() => {
  active.value = route.path
})
function onNavChange(path: string) {
  router.push({
    path,
  })
}
</script>

<template>
  <div class="wrapper">
    <router-view class="container" />
    <var-bottom-navigation v-model:active="active" @change="onNavChange">
      <var-bottom-navigation-item
        v-for="(item, index) in navigationList" :key="index" :name="item.name"
        :label="item.label" :icon="item.icon"
      />
    </var-bottom-navigation>
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
