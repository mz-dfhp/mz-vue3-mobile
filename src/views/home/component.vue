<script lang="ts" setup>
import { reactive } from 'vue'

const formState = reactive({
  fileStr: '',
})
</script>

<template>
  <div class="page-wrapper" style="background: rgb(97, 18, 109);padding: 20px;display: flex;gap: 20px;flex-wrap: wrap;">
    <Upload v-model="formState.fileStr" accept="image/*" />
    <Upload v-model="formState.fileStr" accept="image/*,video/*" />
    <Upload v-model="formState.fileStr" accept="video/*" />
    <Upload v-model="formState.fileStr" accept=".txt" />
  </div>
</template>
