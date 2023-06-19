<script lang="ts" setup>
import { reactive } from 'vue'
import UploadImgs from '@/components/UploadImgs/index.vue'

const formState = reactive({
  fileStr: '',
})
</script>

<template>
  <div style="padding:20px">
    <UploadImgs v-model:file-str="formState.fileStr" />
  </div>
</template>
