<template>
  <div>
    <NuxtLayout name="user-layout">
      <DeleteWorkspaceForm :workspaceId="workspaceId" :userId="userId"/>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Get the route and router
const route = useRoute()

// Get the workspaceId and userId from route params
const workspaceId = ref<string>(route.params.workspaceId as string)
const userId = ref<string>(route.params.userId as string)
</script>

<style scoped>
button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
