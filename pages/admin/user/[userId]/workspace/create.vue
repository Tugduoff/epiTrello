<template>
  <div>
    <h1 class="text-2xl font-bold">Create workspace for user {{ userId }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
