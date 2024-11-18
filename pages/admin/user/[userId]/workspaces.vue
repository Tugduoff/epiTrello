<template>
  <div>
    <h1 class="text-2xl font-bold">Workspaces of user {{ userId }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Get the route and router
const route = useRoute()

// Get the workspaceId and userId from route params
const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
