<script lang="ts" setup>
import { reactive } from 'vue'
import UploadImgs from '@/components/UploadImgs/index.vue'

const formState = reactive({
  fileStr: '',
})
</script>

<template>
  <div style="height: 100%;width: 100%;padding:20px;background: rgb(97, 18, 109);">
    <UploadImgs v-model:file-str="formState.fileStr" />
  </div>
</template>
