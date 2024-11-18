<template>
  <div>
    <h1>Delete Workspace: {{ workspaceName }}</h1>
    <p>Are you sure you want to delete this workspace?</p>
    <button @click="deleteWorkspace">Delete</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// Get the route and router
const route = useRoute()
const router = useRouter()

// Get the workspaceId and userId from route params
const workspaceId = ref<string>(route.params.workspaceId as string)
const userId = ref<string>(route.params.userId as string)

// Ref for workspace name
const workspaceName = ref<string>('')

// Fetch the workspace name on component mount
onMounted(async () => {
  try {
    const response = await axios.get(`/api/users/${userId.value}/workspaces/${workspaceId.value}`)
    workspaceName.value = response.data.workspace.name
  } catch (error) {
    console.error('Failed to fetch workspace:', error)
  }
})

// Handle deletion of workspace
const deleteWorkspace = async () => {
  try {
    await axios.delete(`/api/users/${userId.value}/workspaces/${workspaceId.value}`)
    // After deletion, redirect the user to a different page (e.g., workspaces list)
    router.push(`/users/${userId.value}/workspaces`)
  } catch (error) {
    console.error('Failed to delete workspace:', error)
  }
}
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
