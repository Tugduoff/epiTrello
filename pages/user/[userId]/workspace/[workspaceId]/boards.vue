<template>
  <div>
    <NuxtLayout name="user-layout">
      <h1>Boards of workspace {{ workspaceId }} of user {{ userId }}</h1>
      <div v-if="boards.length === 0">
        <p>No boards found</p>
      </div>
      <div class="mt-4 flex flex-col space-y-4">
        <div v-for="board in boards" :key="board.id" class="bg-slate-400 w-64 p-2 rounded-md cursor-pointer"
          @click.prevent="redirectToBoard(board.id)">
          <p>{{ board.name }}</p>
          <p>{{ board.created_at }}</p>
        </div>
      </div>
      <div class="mt-4 bg-slate-400 w-64 p-2 rounded-md cursor-pointer"
        @click.prevent="redirectToCreateBoard()">
        <p>Create a new board!</p>
        <p>Click on this box to begin creation</p>
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
