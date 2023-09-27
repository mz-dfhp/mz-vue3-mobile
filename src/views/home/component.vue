<script lang="ts" setup>
import { reactive } from 'vue'
import UploadImgs from '@/components/UploadImgs/index.vue'

const formState = reactive({
  fileStr: '',
})
</script>

<template>
  <div class="page-wrapper" style="padding:20px;background: rgb(97, 18, 109);">
    <UploadImgs v-model:file-str="formState.fileStr" />
  </div>
</template>
