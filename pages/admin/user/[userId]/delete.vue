<template>
  <div>
    <NuxtLayout name="admin-layout">
      <DeleteUserForm :userId="userId" />
    </NuxtLayout>
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
