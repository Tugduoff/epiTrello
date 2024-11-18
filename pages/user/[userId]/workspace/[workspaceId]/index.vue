<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <h1 class="text-3xl font-bold text-slate-600 mb-4">
        Workspace {{ workspaceId }} of user {{ userId }}
      </h1>

      <div class="flex flex-col md:flex-row gap-5 items-top justify-between">
        <div class="p-6 bg-white shadow-md rounded-md w-full md:w-1/3">
          <p class="text-xl font-semibold text-gray-700 mb-2">
            Name: <span class="font-normal">{{ workspace.name }}</span>
          </p>
          <p class="text-lg text-gray-600 mb-2">
            Description: <span class="font-normal">{{ workspace.description }}</span>
          </p>
          <p class="text-sm text-gray-400">
            Created at: <span class="font-normal">{{ workspace.created_at }}</span>
          </p>
        </div>

        <div class="p-6 bg-white shadow-md rounded-md w-full md:w-1/3"
          v-if="workspace.boards && workspace.boards.length > 0">
          <div class="flex flex-row items-center justify-between w-full">
            <p class="text-slate-600 font-semibold">Boards</p>
            <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/create`"
              class="text-center w-48 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition hidden xl:flex">
              Create a new board
            </NuxtLink>
            <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/create`"
              class="text-center w-10 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition flex xl:hidden">
              +
            </NuxtLink>
          </div>
          <ul class="mt-4 w-full">
            <li v-for="board in workspace.boards" :key="board.id" class="w-full flex flex-col mb-2">
              <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/${board.id}/`" class="text-lg font-semibold text-white bg-slate-600 w-full p-2 px-4 rounded-md">
                {{ board.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="p-6 bg-white shadow-md rounded-md flex flex-col w-full md:w-1/3 h-full" v-else>
          <div class="flex flex-row items-center justify-between w-full">
            <p class="text-slate-600 font-semibold">No boards found</p>
            <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/create`"
              class="text-center w-48 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition hidden xl:flex">
              Create a new board
            </NuxtLink>
            <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/create`"
              class="text-center w-10 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition flex xl:hidden">
              +
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4 w-full md:w-1/3">
          <NuxtLink 
            :to="`/user/${userId}/workspace/${workspaceId}/delete/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Delete this workspace
          </NuxtLink>
  
          <NuxtLink 
            :to="`/user/${userId}/workspace/${workspaceId}/boards/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Check workspace boards
          </NuxtLink>

          <NuxtLink 
            :to="`/user/${userId}/workspace/${workspaceId}/update/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Update infos
          </NuxtLink>

          <NuxtLink 
            :to="`/user/${userId}/workspaces/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-slate-600 text-white font-semibold hover:bg-slate-700 transition"
          >
            Back to workspaces
          </NuxtLink>
        </div>
      </div>

    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

// Get the workspaceId and userId from route params
const workspaceId = ref<string>(route.params.workspaceId as string)
const userId = ref<string>(route.params.userId as string)

const workspace = ref<any>({})

// Fetch the workspace details
const fetchWorkspace = async () => {
  try {
    // Fetch the workspace details
    const response = await axios.get(`/api/user/${userId.value}/workspace/${workspaceId.value}/`)

    if (response.status === 200) {
      workspace.value = response.data.workspace
    } else {
      console.error('Failed to fetch workspace', response)
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchWorkspaceBoards = async () => {
  try {
    // Fetch the workspace details
    const response = await axios.get(`/api/user/${userId.value}/workspace/${workspaceId.value}/boards/`)

    if (response.status === 200) {
      workspace.value.boards = response.data.boards
    } else {
      console.error('Failed to fetch workspace boards', response)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  await fetchWorkspace()
  await fetchWorkspaceBoards()
})
</script>

<style>
</style>
