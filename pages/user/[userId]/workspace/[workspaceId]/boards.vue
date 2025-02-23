<template>
  <div v-if="addMemberToWorkspacePopup"
    class="absolute top-0 z-[100000000] w-screen h-screen bg-black/50 flex justify-center items-center"
    @click="addMemberToWorkspacePopup = false; inviteMemberToWorkspaceValue = ''; inputMemberError = null"
    @keydown.enter.prevent="submitInviteMemberToWorkspace">
    <div class="relative w-[30rem] bg-white shadow-lg rounded-lg p-6"
      @click.stop>
      <!-- Close Button -->
      <button @click="addMemberToWorkspacePopup = false; inviteMemberToWorkspaceValue = ''; inputMemberError = null" 
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>

      <!-- Header -->
      <h2 class="text-lg font-semibold text-slate-800 mb-4">Invite to Workspace</h2>

      <!-- Input Field -->
      <input type="email" 
        class="w-full h-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
        placeholder="Enter email address"
        v-model="inviteMemberToWorkspaceValue"
        @change="inputMemberError = null" />

      <p v-if="inputMemberError" class="text-red-500 text-sm mb-4">{{ inputMemberError }}</p>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3">
        <button @click="addMemberToWorkspacePopup = false; inviteMemberToWorkspaceValue = ''; inputMemberError = null" 
          class="py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md">
          Cancel
        </button>
        <button @click="submitInviteMemberToWorkspace" type="submit"
          class="py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
          Invite
        </button>
      </div>
    </div>
  </div>

  <div class="bg-slate-100 min-h-screen">
    <NuxtLayout name="user-layout">
      <div class="flex h-full w-full">
        <!-- Sidebar -->
        <div class="flex flex-col w-[18rem] flex-shrink-0 border-gray-200 border-r bg-slate-100 h-full relative"
          v-if="sidebarOpen">
          <!-- Workspace Name and Icon -->
          <div class="flex gap-2 items-center justify-between py-2 pl-2 pr-4">
            <div class="flex gap-2 items-center">
              <div class="w-10 h-10 rounded-md flex items-center justify-center" 
                :style="{ backgroundColor: '#000077' }">
                <span class="font-extrabold text-white" v-if="workspace.name">
                  {{ workspace.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex flex-col justify-center">
                <div class="flex gap-2 items-center">
                  <h2 class="text-md font-semibold text-slate-700" v-if="workspace && workspace.name">{{ workspace.name }}</h2>
                  <Icon icon="mdi:crown" class="w-4 h-4 text-yellow-500" v-if="workspace.owner_id == userId" />
                </div>
                <p class="text-xs text-gray-500" v-if="workspace.members">{{ workspace.members.length + 1 }} Member{{ workspace.members.length + 1 > 1 ? 's' : '' }}</p>
              </div>
            </div>
            <Icon icon="mdi:chevron-left" class="w-8 h-8 p-1 text-slate-500 hover:bg-gray-200 rounded-md hover:cursor-pointer"
              @click="sidebarOpen = false" />
          </div>
          <hr />

          <!-- Navigation Buttons -->
          <div class="py-2 w-full">
            <button class="flex gap-4 py-1 hover:bg-gray-200 items-center w-full !bg-gray-300">
              <Icon icon="mdi:view-dashboard" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-3" />
              <span class="text-sm font-medium text-slate-800">Boards</span>
            </button>
            <button class="flex gap-4 py-1 hover:bg-gray-200 relative overflow-hidden group items-center w-full"
              @click.stop="redirectToWorkspaceMembers(workspace.id)">
              <Icon icon="mdi:account-multiple" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-3" />
              <span class="text-sm font-medium text-slate-800">Members</span>
              <Icon icon="mdi:plus" class="text-slate-600 w-5 h-5 absolute right-2 hover:bg-gray-400 rounded-sm" v-if="isOwner"
                  @click.stop="showAddMemberToWorkspacePopup(workspace.id)" />
            </button>
            <button class="flex gap-4 py-1 hover:bg-gray-200 relative overflow-hidden group items-center w-full"
              @click.stop="redirectToWorkspaceSettings(workspace.id)">
              <Icon icon="mdi:cog" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-3" />
              <span class="text-sm font-medium text-slate-800">Settings</span>
            </button>
          </div>

          <!-- Boards List -->
          <div class="mt-1">
            <div class="flex justify-between items-center mb-3 relative">
              <p class="text-sm font-semibold text-gray-700 ml-3">Your Boards</p>
              <Icon icon="mdi:plus" class="text-slate-600 w-5 h-5 absolute right-2 hover:bg-gray-200 rounded-sm hover:cursor-pointer" v-if="isOwner"
                @click.stop="redirectToCreateBoard" />
            </div>
            <button v-for="(board, i) in workspace.boards" :key="board.id"
              class="flex gap-4 py-1 hover:bg-gray-200 items-center w-full"
              @click="redirectToWorkspaceBoard(workspace.id, workspace.owner_id, board.id)">
              <div class="w-9 h-7 rounded-sm flex items-center justify-center ml-3" 
                :style="{ backgroundColor: board.color }">
              </div>
              <span class="text-sm font-medium text-slate-800">{{ board.name }}</span>
            </button>
          </div>
          <button class="absolute bottom-0 w-full bg-slate-100 flex items-center justify-center gap-4 py-2 hover:bg-gray-200"
            @click="redirectToWorkspaces">
            <Icon icon="mdi:arrow-back-circle" class="text-slate-600 w-6 h-6" />
            <span class="text-md font-bold text-slate-800">Back</span>
          </button>
        </div>

        <div v-else class="h-full bg-gray-400 w-4 hover:cursor-pointer relative"
          @click="sidebarOpen = true">
          <Icon icon="mdi:chevron-right" class="absolute top-4 left-1 w-6 h-6 p-0.5 text-gray-700 bg-gray-300 rounded-full hover:cursor-pointer" />
        </div>

        <!-- Main Content -->
        <div class="flex flex-col flex-1 pt-8 px-36 h-full">
          <header class="w-full justify-center flex mb-6">
            <div class="flex items-start w-2/3 justify-between">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-md flex items-center justify-center" 
                  :style="{ backgroundColor: '#000077' }">
                  <span class="font-extrabold text-white" v-if="workspace.name">
                    {{ workspace.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="flex gap-2 items-center">
                    <h2 class="text-md font-semibold text-slate-700" v-if="workspace && workspace.name">{{ workspace.name }}</h2>
                    <Icon icon="mdi:crown" class="w-4 h-4 text-yellow-500" v-if="workspace.owner_id == userId" />
                  </div>
                  <p class="text-xs text-gray-500" v-if="workspace.members">{{ workspace.members.length + 1 }} Member{{ workspace.members.length + 1 > 1 ? 's' : '' }}</p>
                </div>
              </div>
              <button class="flex gap-4 py-1 bg-blue-500 hover:bg-blue-600 items-center rounded-sm px-4" v-if="isOwner"
                @click="showAddMemberToWorkspacePopup(workspace.id)">
                <Icon icon="mdi:account-add" class="text-white w-6 h-6" />
                <span class="text-xs font-bold text-white">Invite Workspace members</span>
              </button>
              <p class="text-xs text-slate-700 mt-3" v-else>Workspace of <span class="text-white bg-blue-500 p-1 rounded-sm ml-1" v-if="workspace && workspace.owner">{{ workspace.owner.name }}</span></p>
            </div>
          </header>
          <hr />

          <!-- Workspace Header -->
          <div class="flex gap-2 mb-6 mt-4 items-center" v-if="workspace && workspace.boards && workspace.boards.length > 0">
            <Icon icon="mdi:person" class="text-slate-600 w-6 h-6" />
            <h1 class="text-lg font-black text-slate-800">Your boards</h1>
          </div>

          <!-- Workspace Header -->
          <div v-else class="mt-12 text-center text-gray-600 text-lg flex justify-center flex-col items-center gap-6">
            <img src="@/assets/img/inspired.png" class="w-1/3 rounded-sm" />
            <p class="text-xs font-medium text-slate-600 w-1/3">Boards are where work gets done in Trello. On a board, you can move cards between lists to keep projects, tasks, and more on track.</p>
            <button class="text-white bg-blue-500 px-4 py-2 rounded-sm text-sm" @click="redirectToCreateBoard" v-if="isOwner">Create your first board</button>
          </div>

          <div class="mt-4 flex flex-wrap -mx-2 justify-between items-center relative">
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative bg-slate-300 flex justify-center items-center hover:cursor-pointer mb-4" v-if="isOwner"
                @click="redirectToCreateBoard">
                <h2 class="text-sm font-semibold text-slate-700">Create a new board</h2>
            </div>
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative hover:cursor-pointer mb-4" v-for="(board, i) in workspace.boards"
              :style="{ backgroundColor: board.color }"
              @click="redirectToWorkspaceBoard(workspace.id, workspace.owner_id, board.id)">
              <h2 class="text-sm font-semibold"
                :style="{ color: computeFromContrast(board.color) }">{{ board.name }}</h2>
              <Icon icon="mdi:crown" class="w-4 h-4 absolute bottom-2 right-2" v-if="workspace.owner_id == userId"
                :style="{ color: computeFromContrast(board.color) }" />
              <div class="absolute bottom-2 left-2 group flex items-center hover:cursor-pointer" v-if="board.member_count > 1">
                <Icon icon="mdi:account-multiple" class="w-8 h-4 pr-2"
                  :style="{ color: computeFromContrast(board.color) }" />
                <span class="text-xs group-hover:flex hidden -ml-2"
                  :style="{ color: computeFromContrast(board.color) }">{{ board.member_count }}</span>
              </div>
            </div>
            <div class="w-[23.5%] h-[7rem]" v-if="workspace && workspace.boards && workspace.boards.length % 4 < 1 && !isOwner" />
            <div class="w-[23.5%] h-[7rem]" v-if="workspace && workspace.boards && workspace.boards.length % 4 < 2" />
            <div class="w-[23.5%] h-[7rem] bg-slate-100" v-if="workspace && workspace.boards && workspace.boards.length % 4 < 3" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()

Cookies.set('boardColor', '#f1f5f9')

const workspaceId = ref<string>(route.params.workspaceId as string)
const workspaceUserId = ref<string>(route.params.userId as string)
const userId = ref<string>(route.params.userId as string)
const userEmail = Cookies.get('user')

const workspace = ref<any>({})
const sidebarOpen = ref<boolean>(true)
const isOwner = ref<boolean>(false)

const inviteMemberToWorkspaceValue = ref<string>('')

const addMemberToWorkspacePopup = ref<boolean>(false)
const currentlyOpenedWorkspaceId = ref<string>('')
const inputMemberError = ref<string | null>(null)

// Either returns text-white or text-slate-700 based on the contrast of the color
function computeFromContrast(color: string) {
  // Ensure the color starts with '#' and is in the correct format
  if (!/^#([0-9A-Fa-f]{6})$/.test(color)) {
    throw new Error('Invalid color format. Use #RRGGBB format.')
  }

  console.log('Computing contrast for color', color)

  // Extract RGB values
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#1e293b' : '#ffffff'
}

function redirectToWorkspaceBoard(workspaceId: string, workspaceOwnerId: string, boardId: string) {
  console.log('Redirecting to workspace board', workspaceId, boardId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}/board/${boardId}`)
}

function redirectToWorkspaceMembers(workspaceId: string) {
  console.log('Redirecting to workspace members', workspaceId)
  router.push(`/user/${workspaceUserId.value}/workspace/${workspaceId}/members`)
}

function redirectToWorkspaceSettings(workspaceId: string) {
  console.log('Redirecting to workspace settings', workspaceId)
  router.push(`/user/${workspaceUserId.value}/workspace/${workspaceId}/settings`)
}

function redirectToBoard(boardId: string) {
  console.log('Redirecting to board', boardId)
  router.push(`/user/${workspaceUserId.value}/workspace/${workspaceId.value}/board/${boardId}`)
}

function deleteBoard(boardId: string) {
  console.log('Deleting board', boardId)
}

function editBoard(boardId: string) {
  console.log('Editing board', boardId)
}

function redirectToWorkspaces() {
  console.log('Redirecting to workspaces')
  router.push(`/user/${userId.value}`)
}

function redirectToCreateBoard() {
  console.log('Redirecting to create board')
  router.push(`/user/${workspaceUserId.value}/workspace/${workspaceId.value}/board/create`)
}

function showAddMemberToWorkspacePopup(workspaceId: string) {
  console.log('Showing add member to workspace popup', workspaceId)
  addMemberToWorkspacePopup.value = true
  currentlyOpenedWorkspaceId.value = workspaceId
}

async function submitInviteMemberToWorkspace() {
  if (inviteMemberToWorkspaceValue.value == userEmail) {
    inputMemberError.value = 'You cannot add yourself as a member'
    inviteMemberToWorkspaceValue.value = ''
    return
  }
  try {
    // Fetch the workspace details
    const response = await axios.post(`/api/user/${workspaceUserId.value}/workspace/${currentlyOpenedWorkspaceId.value}/member/create/`, {
      email: inviteMemberToWorkspaceValue.value
    })
    inviteMemberToWorkspaceValue.value = ''
    if (response.data.status === 201) {
      inputMemberError.value = null
      addMemberToWorkspacePopup.value = false
      await fetchWorkspaceMembers()
    } else {
      console.error('Failed to add member', response)
      inputMemberError.value = response.data.error
    }
  } catch (error) {
    console.error(error)
  }
}

function redirectToWorkspaceBoards(workspaceId: string) {
  console.log('Redirecting to workspace boards', workspaceId)
  router.push(`/user/${userId.value}/workspace/${workspaceId}/boards`)
}

// Fetch a user
async function fetchUser(userId: string) {
  try {
    const res = await axios.get(`/api/user/${userId}/`)

    if (res.status === 200) {
      return res.data.user
    } else {
      console.error('Failed to fetch user', res)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch all workspace members
async function fetchWorkspaceMembers() {
  try {
    const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/members/`)
    workspace.value.members = []

    if (res.data.status === 200) {
      const members = res.data.members
      console.log('Members', members)
      for (const member of members) {
        const user = await fetchUser(member.user_id)
        workspace.value.members.push({
          id: member.user_id,
          name: user.name,
          email: user.email,
          role: member.role
        })
      }

    } else {
      console.error('Failed to fetch workspace members', res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function fetchWorkspaceBoards() {
  try {
    // Fetch the workspace details
    const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/boards/`)
    workspace.value.boards = []

    if (res.data.status === 200) {
      if (isOwner.value) {
        for (const board of res.data.boards) {
            const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/board/${board.id}/members`)

            board.member_count = res.data.members.length + 1
            workspace.value.boards.push(board)
        }
        return
      }
      for (const board of res.data.boards) {
        const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/board/${board.id}/members`)
        board.member_count = res.data.members.length + 1

        for (const member of res.data.members) {
          if (member.user_id === userId.value && member.board_id === board.id) {
            workspace.value.boards.push(board)
            break
          }
        }
      }
    } else {
      console.error('Failed to fetch workspace boards', res)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch the workspace details
async function fetchWorkspace() {
  try {
    // Fetch the workspace details
    const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/`)

    if (res.status === 200) {
      workspace.value = res.data.workspace
    } else {
      console.error('Failed to fetch workspace', res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function fetchRealUser() {
  try {
    const res = await axios.get(`/api/user/mail?email=${userEmail}`)

    if (res.status === 200) {
      userId.value = res.data.user.id
    } else {
      console.error('Failed to fetch user', res)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch info about the owner
async function fetchOwner() {
  try {
    const res = await axios.get(`/api/user/${workspaceUserId.value}/`)

    console.log(res)
    if (res.data.status === 200) {
      console.log('Owner', res.data.user)
      workspace.value.owner = res.data.user
      console.log('Owner', workspace.value.owner)
      if (workspace.value.owner.email === userEmail) {
        console.log('Owner')
        isOwner.value = true
      }
    } else {
      console.error('Failed to fetch owner', res)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  await fetchRealUser()
  await fetchWorkspace()
  await fetchOwner()
  await fetchWorkspaceMembers()
  workspace.value.member_count = workspace.value.members.length + 1
  await fetchWorkspaceBoards()
})
</script>
