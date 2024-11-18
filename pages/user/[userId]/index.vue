<template>
  <div>
    <NuxtLayout name="user-layout">
      <h1>Dashboard of user {{ userId }}</h1>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["redirect-user-if-unauthorized"]
})

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
