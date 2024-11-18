<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Boards of workspace {{ workspaceId }} of user {{ userId }}</h1>

      <div v-if="boards.length === 0" class="text-center text-gray-600 text-lg">
        <p>No boards found</p>
      </div>

      <div class="mt-4 flex flex-wrap -mx-2 justify-center items-center">
        <div
          v-for="board in boards"
          :key="board.id"
          class="p-4 w-full sm:w-1/2 md:w-1/3"
          @click.prevent="redirectToBoard(board.id)"
        >
          <div class="p-10 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg transition duration-200">
            <p class="text-lg font-semibold text-gray-800">{{ board.name }}</p>
            <p class="text-sm text-gray-600">{{ board.created_at }}</p>
          </div>
        </div>
      </div>

      <div 
        class="mt-10 mx-auto bg-blue-500 w-full max-w-sm p-4 rounded-lg text-center cursor-pointer text-white font-semibold text-lg transition-transform transform hover:scale-105"
        @click.prevent="redirectToCreateBoard()"
      >
        <p>Create a new board!</p>
        <p class="text-sm font-normal mt-1">Click on this box to begin creation</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// Get the workspaceId and userId from route params
const userId = ref<string>(route.params.userId as string)
const workspaceId = ref<string>(route.params.workspaceId as string)

const boards = ref<any[]>([])

const redirectToBoard = (boardId: string) => {
  router.push(`/user/${userId.value}/workspace/${workspaceId.value}/board/${boardId}`)
}

const redirectToCreateBoard = () => {
  router.push(`/user/${userId.value}/workspace/${workspaceId.value}/board/create`)
}

const fetchBoards = async () => {
  try {
    const response = await axios.get(`/api/user/${userId.value}/workspace/${workspaceId.value}/boards`)
    if (response.status === 200) {
      boards.value = response.data.boards
      console.log('Boards fetched', boards.value)
    } else {
      console.error('Failed to fetch boards', response)
    }
  } catch (error) {
    console.error('Error fetching boards:', error)
  }
}

onMounted(fetchBoards)
</script>

<style>

</style>
