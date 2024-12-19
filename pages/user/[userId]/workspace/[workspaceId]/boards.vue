<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <div class="flex flex-row justify-between items-center gap-2 mb-2">
        <div class="flex flex-row items-center gap-4 w-1/3">
          <h1 class="text-xl font-semibold text-slate-800">Workspace: </h1>
          <p class="text-xl text-slate-600 font-medium" v-if="workspaceName">{{ workspaceName }}</p>
        </div>
        <h1 class="text-3xl font-bold text-center text-gray-800 w-1/3">Boards</h1>
        <div class=" w-1/3 flex justify-end">
          <NuxtLink :to="`/user/${boardUserId}/workspace/${workspaceId}/`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-100 hover:text-black hover:border-slate-900 border-slate-100 border-2 transition duration-300 ml-1">Back</NuxtLink>
        </div>
      </div>

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
          <div class="p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg transition duration-200"
            :style="{ backgroundColor: board.color }">
            <div class="flex justify-between">
              <p class="text-lg font-semibold text-gray-800">{{ board.name }}</p>
              <div class="flex gap-4" v-if="isOwner">
                <button class="text-white bg-red-500 px-2 py-1 rounded-md" @click.stop="deleteBoard(board.id)">Delete</button>
                <button class="text-white bg-blue-500 px-2 py-1 rounded-md" @click.stop="editBoard(board.id)">Edit</button>
              </div>
            </div>
            <p class="text-sm text-gray-600">Created: {{ board.created_at }}</p>
            <p class="text-sm text-gray-600">Owner: {{ board.owner }}</p>
          </div>
        </div>
      </div>

      <div 
        class="mt-10 mx-auto bg-blue-500 w-full max-w-sm p-4 rounded-lg text-center cursor-pointer text-white font-semibold text-lg transition-transform transform hover:scale-105"
        @click.prevent="redirectToCreateBoard()"
        v-if="isOwner"
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
import Cookies from 'js-cookie'

const userEmail = Cookies.get('user')

const route = useRoute()
const router = useRouter()

// Get the workspaceId and boardUserId from route params
const boardUserId = ref<string>(route.params.userId as string)
const workspaceId = ref<string>(route.params.workspaceId as string)
const workspaceName = ref('')
const userId = ref(0)
const isOwner = ref<boolean>(false)

const boards = ref<any[]>([])

const redirectToBoard = (boardId: string) => {
  router.push(`/user/${boardUserId.value}/workspace/${workspaceId.value}/board/${boardId}`)
}

const redirectToCreateBoard = () => {
  router.push(`/user/${boardUserId.value}/workspace/${workspaceId.value}/board/create`)
}

const deleteBoard = async (boardId: string) => {
  try {
    const response = await axios.delete(`/api/user/${boardUserId.value}/workspace/${workspaceId.value}/board/${boardId}`)
    if (response.data.status === 200) {
      await fetchBoards()
    } else {
      console.error('Failed to delete board', response)
    }
  } catch (error) {
    console.error('Error deleting board:', error)
  }
}

const editBoard = (boardId: string) => {
  router.push(`/user/${boardUserId.value}/workspace/${workspaceId.value}/board/${boardId}/settings`)
}

const fetchBoards = async () => {
  try {
    const response = await axios.get(`/api/user/${boardUserId.value}/workspace/${workspaceId.value}/boards`)
    if (response.data.status === 200) {
      boards.value = []
      for (const board of response.data.boards) {
        const owner = await axios.get(`/api/user/${boardUserId.value}/workspace/${workspaceId.value}/board/${board.id}/owner`)
        if (owner.data.status === 200) {
          board.owner = owner.data.owner.name
        }
        if (isOwner.value) {
          boards.value.push(board)
          continue
        }
        const res = await axios.get(`/api/user/${boardUserId.value}/workspace/${workspaceId.value}/board/${board.id}/members`)
        for (const member of res.data.members) {
          if (member.user_id === userId.value && member.board_id === board.id) {
            boards.value.push(board)
            break
          }
        }
      }

      console.log('Boards fetched', boards.value)
    } else {
      console.error('Failed to fetch boards', response)
    }
  } catch (error) {
    console.error('Error fetching boards:', error)
  }
}

const fetchRealUser = async () => {
  try {
    const response = await axios.get(`/api/user/mail?email=${userEmail}`)

    if (response.data.status === 200) {
      userId.value = response.data.user.id
    } else {
      console.error('Failed to fetch user', response)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchRealUser()
  const res = await axios.get(`/api/user/${boardUserId.value}/workspace/${workspaceId.value}`)
  workspaceName.value = res.data.workspace.name
  if (userId.value === res.data.workspace.owner_id) {
    isOwner.value = true
  }
  await fetchBoards()
})
</script>

<style>

</style>
