<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goComponent() {
  router.push('/component')
}
</script>

<template>
  <div class="page-wrapper" style="background: chocolate;padding: 20px;display: flex;gap: 20px;flex-wrap: wrap;">
    <van-button type="primary">
      主要按钮
    </van-button>
    <van-button type="success">
      成功按钮
    </van-button>
    <van-button type="default">
      默认按钮
    </van-button>
    <van-button type="warning">
      警告按钮
    </van-button>
    <van-button type="danger">
      危险按钮
    </van-button>
    <van-button type="danger" @click="goComponent()">
      详情
    </van-button>
    <div style="height: 90vh;background: pink;width: 100%;" />
  </div>
</template>
