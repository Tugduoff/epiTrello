<template>
  <div v-if="addMemberToWorkspacePopup"
    class="absolute top-0 z-[100000000] w-screen h-screen bg-black/50 flex justify-center items-center"
    @keydown.enter.prevent="submitInviteMemberToWorkspace">
    <div class="relative w-[30rem] bg-white shadow-lg rounded-lg p-6">
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

  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <div class="flex justify-center w-full mt-6 gap-8">
        <div class="flex flex-col gap-2 w-[15rem]">
          <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg !bg-blue-200 items-center">
            <Icon icon="simple-icons:trello" class="min-h-6 max-h-6 min-w-6 max-w-6 ml-1 !text-blue-500" />
            <span class="text-sm font-semibold text-blue-500">Boards</span>
          </button>
          <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg items-center" @mouseenter="hoverTemplateButton = true"
            @mouseleave="hoverTemplateButton = false">
            <div class="relative">
              <Icon icon="fluent:border-none-16-filled" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6" />
              <Icon icon="mdi:trello" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 absolute mt-[-19px] ml-[5px] rounded-md"
                :class="hoverTemplateButton ? 'bg-gray-200' : 'bg-slate-100'" />
            </div>
            <span class="text-sm font-semibold text-slate-800">Templates</span>
          </button>
          <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg items-center">
            <Icon icon="gravity-ui:pulse" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-1" />
            <span class="text-sm font-semibold text-slate-800">Home</span>
          </button>
          <hr />
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-sm font-bold text-slate-800">Workspaces</h2>
            <Icon icon="mdi:plus" class="text-slate-600 w-5 h-5 hover:bg-gray-200 rounded-sm hover:cursor-pointer"
              @click.stop="redirectToCreateWorkspace" />
          </div>
          <div v-for="(workspace, i) in workspaces"
            :key="workspace.id"
            class="flex flex-col gap-2">
            <div class="flex justify-between items-center hover:bg-gray-200 p-2 rounded-lg hover:cursor-pointer"
              @click="workspaceToolBar[i] = !workspaceToolBar[i]">
              <div class="flex gap-2">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                  :style="{ backgroundColor: workspaceColors[i] }"><span class="font-extrabold text-white">{{ workspace.name.charAt(0).toUpperCase() }}</span></div>
                <h2 class="text-sm font-semibold text-slate-800 items-center text-center flex">{{ workspace.name }}</h2>
              </div>
              <Icon :icon="workspaceToolBar[i] ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-slate-600 w-6 h-6" />
            </div>
            <div v-if="workspaceToolBar[i]"
              class="flex flex-col gap-2 pl-4">
              <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg items-center"
                @click="redirectToWorkspaceBoards(workspace.id, workspace.owner_id)">
                <Icon icon="mdi:view-dashboard" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-1" />
                <span class="text-sm font-semibold text-slate-800">Boards</span>
              </button>
              <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg relative overflow-hidden group items-center"
                @click="redirectToWorkspaceMembers(workspace.id, workspace.owner_id)">
                <Icon icon="mdi:account-multiple" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-1" />
                <span class="text-sm font-semibold text-slate-800">Members</span>
                <Icon icon="mdi:plus" class="text-slate-600 w-5 h-5 absolute right-2 hover:bg-gray-400 rounded-sm transform transition-transform duration-300 ease-in-out group-hover:translate-x-[-2rem]"
                  @click.stop="showAddMemberToWorkspacePopup(workspace.id)" />
                <Icon icon="mdi:chevron-right" class="text-slate-600 w-6 h-6 absolute right-[-2rem] transform transition-transform duration-300 ease-in-out group-hover:translate-x-[-2.5rem]" />
              </button>
              <button class="flex gap-4 hover:bg-gray-200 p-2 rounded-lg relative overflow-hidden group items-center"
                @click="redirectToWorkspaceSettings(workspace.id, workspace.owner_id)">
                <Icon icon="mdi:cog" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6 ml-1" />
                <span class="text-sm font-semibold text-slate-800">Settingss</span>
                <Icon icon="mdi:chevron-right" class="text-slate-600 w-6 h-6 absolute right-[-2rem] transform transition-transform duration-300 ease-in-out group-hover:translate-x-[-2.5rem]" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-[60rem]">
          <!-- Recently viewed -->
          <div class="flex gap-2 mt-2">
            <Icon icon="mdi:clock-outline" class="text-slate-600 w-6 h-6" />
            <h2 class="text-sm font-semibold text-slate-800">Recently viewed</h2>
          </div>
          <div class="flex flex-wrap mt-3 justify-between">
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative hover:cursor-pointer"
              :style="{ backgroundColor: exampleRecentlyViewedColors[0] }">
              <h2 class="text-sm font-semibold text-white">Personal Introspection</h2>
              <Icon icon="mdi:crown" class="text-white w-4 h-4 absolute bottom-2 right-2" />
                <div class="absolute bottom-2 left-2 group flex items-center hover:cursor-pointer">
                  <Icon icon="mdi:account-multiple" class="text-white w-8 h-4 pr-2" />
                  <span class="text-white text-xs group-hover:flex hidden -ml-2">3789</span>
                </div>
            </div>
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative hover:cursor-pointer"
              :style="{ backgroundColor: exampleRecentlyViewedColors[1] }">
              <h2 class="text-sm font-semibold text-white">AREA is a pain</h2>
              <Icon icon="mdi:crown" class="text-white w-4 h-4 absolute bottom-2 right-2" />
            </div>
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative hover:cursor-pointer"
              :style="{ backgroundColor: exampleRecentlyViewedColors[2] }">
              <h2 class="text-sm font-semibold text-white">New Year Eve</h2>
                <div class="absolute bottom-2 left-2 group flex items-center hover:cursor-pointer">
                  <Icon icon="mdi:account-multiple" class="text-white w-8 h-4 pr-2" />
                  <span class="text-white text-xs group-hover:flex hidden -ml-2">14</span>
                </div>
            </div>
            <div class="w-[23.5%] h-[7rem] rounded-sm py-1 px-2 relative hover:cursor-pointer"
              :style="{ backgroundColor: exampleRecentlyViewedColors[3] }">
              <h2 class="text-sm font-semibold text-white">Trip in Deutschland</h2>
              <Icon icon="mdi:crown" class="text-white w-4 h-4 absolute bottom-2 right-2" />
            </div>
          </div>
          <h2 class="text-md font-black text-slate-600 mt-8">YOUR WORKSPACES</h2>
          <div class="flex flex-col gap-4 mt-4 mb-2"
            v-for="(workspace, i) in workspaces">
            <div class="flex justify-between w-full">
              <div class="flex gap-2 items-center">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :style="{ backgroundColor: workspaceColors[i] }"><span class="font-extrabold text-white">{{ workspace.name.charAt(0).toUpperCase() }}</span></div>
                <h2 class="text-sm font-semibold text-slate-800 items-center text-center flex">{{ workspace.name }}</h2>
                <Icon icon="mdi:crown" class="w-4 h-4 text-yellow-500" v-if="workspace.owner_id == userId" />
              </div>
              <div class="flex gap-3">
                <button class="flex gap-2 bg-gray-200 hover:bg-gray-300 p-2 px-4 rounded-sm items-center"
                  @click="redirectToWorkspaceBoards(workspace.id, workspace.owner_id)">
                  <Icon icon="mdi:view-dashboard" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6" />
                  <span class="text-sm font-medium text-slate-800">Boards</span>
                </button>
                <button class="flex gap-2 bg-gray-200 hover:bg-gray-300 p-2 px-4 rounded-sm items-center"
                  @click="redirectToWorkspaceMembers(workspace.id, workspace.owner_id)">
                  <Icon icon="mdi:account-multiple" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6" />
                  <span class="text-sm font-medium text-slate-800">Members</span>
                </button>
                <button class="flex gap-2 bg-gray-200 hover:bg-gray-300 p-2 px-4 rounded-sm items-center"
                  @click="redirectToWorkspaceSettings(workspace.id, workspace.owner_id)">
                  <Icon icon="mdi:cog" class="text-slate-600 min-h-6 max-h-6 min-w-6 max-w-6" />
                  <span class="text-sm font-medium text-slate-800">Settings</span>
                </button>
              </div>
            </div>
            <div class="flex flex-wrap justify-between">
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
              <div class="w-[23.5%] h-[7rem] mb-4 rounded-sm py-1 px-2 relative bg-slate-300 flex justify-center items-center hover:cursor-pointer" v-if="workspace.owner_id == userId"
                @click="redirectToCreateWorkspaceBoard(workspace.id, workspace.owner_id)">
                <h2 class="text-sm font-semibold text-slate-700">Create a new board</h2>
              </div>
              <div class="w-[23.5%] h-[7rem] mb-4" v-if="workspace && workspace.boards && workspace.boards.length % 4 < 1 && workspace.owner_id != userId" />
              <div class="w-[23.5%] h-[7rem] mb-4" v-if="workspace && workspace.boards && workspace.boards.length < 2" />
              <div class="w-[23.5%] h-[7rem] mb-4" v-if="workspace && workspace.boards && workspace.boards.length < 3" />
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Icon } from '@iconify/vue'
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()

const userEmail = Cookies.get('user')
const workspaceUserId = ref<string>(route.params.userId as string)

const hoverTemplateButton = ref<boolean>(false)
const workspaceToolBar = ref<boolean[]>([])
const workspaceColors = ref<string[]>([])

const exampleRecentlyViewedColors = ref<string[]>([
  generateRandomColor(),
  generateRandomColor(),
  generateRandomColor(),
  generateRandomColor()
])

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

function redirectToCreateWorkspaceBoard(workspaceId: string, workspaceOwnerId: string) {
  console.log('Redirecting to create board', workspaceId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}/board/create`)
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
    } else {
      console.error('Failed to add member', response)
      inputMemberError.value = response.data.error
    }
  } catch (error) {
    console.error(error)
  }
}

function generateRandomColor() {
  let color: string;
  do {
    color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  } while (parseInt(color.substring(0, 2), 16) > 200 || 
           parseInt(color.substring(2, 4), 16) > 200 || 
           parseInt(color.substring(4, 6), 16) > 200);
  return `#${color}`;
}

// Get the workspaceId and userId from route params
const userId = ref<string>(route.params.userId as string)

const workspaces = ref<any>([])

const redirectToWorkspace = (workspaceId: string, workspaceOwnerId: string) => {
  console.log('Redirecting to workspace', workspaceId, 'of user', workspaceOwnerId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}`)
}

function redirectToWorkspaceSettings(workspaceId: string, workspaceOwnerId: string) {
  console.log('Redirecting to workspace settings', workspaceId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}/settings`)
}

function redirectToWorkspaceBoards(workspaceId: string, workspaceOwnerId: string) {
  console.log('Redirecting to workspace boards', workspaceId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}/boards`)
}

function redirectToWorkspaceMembers(workspaceId: string, workspaceOwnerId: string) {
  console.log('Redirecting to workspace members', workspaceId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}/members`)
}

const redirectToCreateWorkspace = () => {
  router.push(`/user/${userId.value}/workspace/create`)
}

const fetchWorkspaces = async () => {
  try {
    const res = await axios.get(`/api/user/${userId.value}/workspaces`)
    console.log(res.data)
    if (res.data.status === 200) {
      workspaces.value = res.data.workspaces
      console.log('Workspaces fetched', workspaces.value)
    } else {
      console.error('Failed to fetch workspaces', res)
    }
  } catch (error) {
    console.error('Error fetching workspaces:', error)
  }
}

// Fetch workspace member count
const fetchWorkspaceMemberCount = async (workspace: any) => {
  try {
    const response = await axios.get(`/api/user/${workspace.owner_id}/workspace/${workspace.id}/members`)
    if (response.status === 200) {
      const memberCount = response.data.members.length
      workspace.member_count = memberCount + 1
    } else {
      console.error('Failed to fetch workspace member count', response)
      workspace.member_count = 1
    }
  } catch (error) {
    console.error('Error fetching workspace member count:', error)
  }
}

async function fetchOwner(workspaceOwnerId: string): Promise<boolean> {
  try {
    const res = await axios.get(`/api/user/${workspaceOwnerId}/`)

    console.log(res)
    if (res.data.status === 200) {
      console.log('Owner', res.data.user)
      if (res.data.user.email === userEmail) {
        console.log('Owner')
        return true;
      }
    } else {
      console.error('Failed to fetch owner', res)
      return false;
    }
  } catch (error) {
    console.error(error)
    return false;
  }
  return false;
}

async function fetchWorkspaceBoards(workspaceId: string, workspaceOwnerId: string) {
  try {
    // Fetch the workspace details
    const res = await axios.get(`/api/user/${workspaceOwnerId}/workspace/${workspaceId}/boards/`)

    const workspace = workspaces.value.find((workspace: any) => workspace.id === workspaceId)
    workspace.boards = []
    if (res.data.status === 200) {
      if (await fetchOwner(workspaceOwnerId)) {
        for (const board of res.data.boards) {
          const res2 = await axios.get(`/api/user/${workspaceOwnerId}/workspace/${workspaceId}/board/${board.id}/members`)
          board.member_count = res2.data.members.length + 1
          workspace.boards.push(board)
        }
        return
      }
      console.log('Is not owner', res.data.boards)
      for (const board of res.data.boards) {
        const res2 = await axios.get(`/api/user/${workspaceOwnerId}/workspace/${workspaceId}/board/${board.id}/members`)
        board.member_count = res2.data.members.length + 1

        console.log(res2)
        for (const member of res2.data.members) {
          if (member.user_id == userId.value && member.board_id === board.id) {
            workspace.boards.push(board)
            break
          }
        }
      }
    } else {
      console.error('Failed to fetch workspace boards', res)
      return
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  workspaces.value = []
  workspaceToolBar.value = []
  workspaceColors.value = []
  await fetchWorkspaces()
  for (const workspace of workspaces.value) {
    await fetchWorkspaceMemberCount(workspace)
    await fetchWorkspaceBoards(workspace.id, workspace.owner_id)
    workspaceToolBar.value.push(false)
    workspaceColors.value.push(generateRandomColor())
  }
})
</script>
