<script lang="ts" setup>
import { ref } from 'vue'

const refreshing = ref(false)
const loading = ref(false)
const list = ref<number[]>([])

function refresh() {
  setTimeout(() => {
    console.log('refresh')
    refreshing.value = false
  }, 2000)
}

function load() {
  setTimeout(() => {
    for (let i = 0; i < 20; i++)
      list.value.push(list.value.length + 1)

    loading.value = false
  }, 1000)
}
</script>

<template>
  <var-pull-refresh v-model="refreshing" @refresh="refresh">
    <var-list v-model:loading="loading" @load="load">
      <var-cell v-for="d in list" :key="d">
        ListItem {{ d }}
      </var-cell>
    </var-list>
  </var-pull-refresh>
</template>
