<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">

      <div class="flex flex-col md:flex-row gap-5 items-top justify-between">
        <div class="p-6 bg-white shadow-md rounded-md w-full md:w-1/3">
          <p class="text-xl font-semibold text-gray-700 mb-2">
            Name: <span class="font-normal">{{ workspace.name }}</span>
          </p>
          <p class="text-lg text-gray-600">
            Description: <span class="font-normal">{{ workspace.description }}</span>
          </p>
          <div class="flex flex-col mb-2" v-if="workspace.owner">
            <p class="text-lg text-gray-600">Owner:</p>
            <p class="text-sm text-gray-800 pl-4 font-medium">{{ workspace.owner.name }}</p>
            <p class="text-sm text-gray-800 pl-4 font-medium">{{ workspace.owner.email }}</p>
          </div>
          <p class="text-sm text-gray-400">
            Created at: <span class="font-normal">{{ workspace.created_at }}</span>
          </p>
        </div>

        <div class="p-6 bg-white shadow-md rounded-md w-full md:w-1/3"
          v-if="workspace.boards && workspace.boards.length > 0">
          <div class="flex flex-row items-center justify-between w-full">
            <p class="text-slate-600 font-semibold">Boards</p>
            <NuxtLink :to="`/user/${workspaceUserId}/workspace/${workspaceId}/board/create`"
              v-if="isOwner"
              class="text-center w-48 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition hidden xl:flex">
              Create a new board
            </NuxtLink>
            <NuxtLink :to="`/user/${workspaceUserId}/workspace/${workspaceId}/board/create`"
              v-if="isOwner"
              class="text-center w-10 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition flex xl:hidden">
              +
            </NuxtLink>
          </div>
          <ul class="mt-4 w-full">
            <li v-for="board in workspace.boards" :key="board.id" class="w-full flex flex-col mb-2">
              <NuxtLink :to="`/user/${workspaceUserId}/workspace/${workspaceId}/board/${board.id}/`" class="text-lg font-semibold text-white bg-slate-600 w-full p-2 px-4 rounded-md">
                {{ board.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="p-6 bg-white shadow-md rounded-md flex flex-col w-full md:w-1/3 h-full" v-else>
          <div class="flex flex-row items-center justify-between w-full">
            <p class="text-slate-600 font-semibold">No boards found</p>
            <NuxtLink :to="`/user/${workspaceUserId}/workspace/${workspaceId}/board/create`"
              v-if="isOwner"
              class="text-center w-48 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition hidden xl:flex">
              Create a new board
            </NuxtLink>
            <NuxtLink :to="`/user/${workspaceUserId}/workspace/${workspaceId}/board/create`"
              v-if="isOwner"
              class="text-center w-10 h-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition flex xl:hidden">
              +
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4 w-full md:w-1/3">
          <NuxtLink 
            :to="!isOwner ? '' : `/user/${workspaceUserId}/workspace/${workspaceId}/delete/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            :class="!isOwner ? 'cursor-not-allowed' : ''"
            :disabled="!isOwner"
            v-if="isOwner"
          >
            Delete this workspace
          </NuxtLink>
  
          <NuxtLink 
            :to="`/user/${workspaceUserId}/workspace/${workspaceId}/boards/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Check workspace boards
          </NuxtLink>

          <NuxtLink 
            :to="!isOwner ? '' : `/user/${workspaceUserId}/workspace/${workspaceId}/update/`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            :class="!isOwner ? 'cursor-not-allowed' : ''"
            :disabled="!isOwner"
            v-if="isOwner"
          >
            Update infos
          </NuxtLink>

          <NuxtLink 
            :to="`/user/${userId}`" 
            class="block text-center w-full md:w-auto px-4 py-2 rounded bg-slate-600 text-white font-semibold hover:bg-slate-700 transition"
          >
            Back to workspaces
          </NuxtLink>
        </div>
      </div>
      <div class="p-6 bg-white shadow-md rounded-md w-full mt-6">
        <p class="text-xl font-semibold text-gray-700 mb-4">Members</p>
        <table class="w-full border-collapse border border-gray-200 text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Name</th>
              <th class="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Email</th>
              <th class="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Role</th>
              <th class="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-50" v-if="workspace.owner">
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">{{ workspace.owner.name }}</td>
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">{{ workspace.owner.email }}</td>
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">Owner</td>
            </tr>
            <tr v-for="member in workspace.members" :key="member.id" class="hover:bg-gray-50">
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">{{ member.name }}</td>
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">{{ member.email }}</td>
              <td class="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                <span v-if="isOwner" class="relative">
                  <select
                    class="block w-full bg-white border border-gray-300 rounded-md text-sm p-1"
                    v-model="member.role"
                    @change="updateMemberRole(member.id, member.role)"
                  >
                    <option value="member">Member</option>
                    <option value="editor">Editor</option>
                  </select>
                </span>
                <span v-else>{{ member.role }}</span>
              </td>
              <td class="border border-gray-200 px-4 py-2 text-sm" v-if="isOwner">
                <button
                  class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  @click="removeMember(member.id)"
                >
                  Remove
                </button>
              </td>
              <td class="border border-gray-200 px-4 py-2 text-sm" v-else>
                <button
                  class="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition cursor-not-allowed"
                  disabled
                  @click="removeMember(member.id)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4 flex items-center space-x-2" v-if="isOwner">
          <input
            type="text"
            placeholder="Enter email to add member"
            class="flex-grow border border-gray-300 p-2 rounded-md text-sm"
            v-model="inputMemberEmail"
          />
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition hidden xl:flex"
            @click="addMember(inputMemberEmail)"
          >
            Add Member
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex xl:hidden"
            @click="addMember(inputMemberEmail)"
          >
            +
          </button>
        </div>
        <p v-if="inputMemberError" class="text-red-500 text-sm mt-2">{{ inputMemberError }}</p>
      </div>


    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const route = useRoute()

// Get the workspaceId and userId from route params
const workspaceId = ref<string>(route.params.workspaceId as string)
const workspaceUserId = ref<string>(route.params.userId as string)
const isOwner = ref<boolean>(false)
const userEmail = Cookies.get('user')
const userId = ref<string>('')

const workspace = ref<any>({})

const inputMemberEmail = ref<string>('')
const inputMemberError = ref<null | string>(null)

// Update a member role
const updateMemberRole = async (memberId: string, role: string) => {
  try {
    // Fetch the workspace details
    const response = await axios.put(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/member/${memberId}/role`, {
      role: role
    })

    if (response.data.status === 200) {
      console.log('Member role updated')
      console.log(response.data)
    } else {
      console.error('Failed to update member role', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// Remove a workspace member
const removeMember = async (memberId: string) => {
  try {
    // Fetch the workspace details
    const response = await axios.delete(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/member/${memberId}/`)

    if (response.data.status === 204) {
      workspace.value.members = workspace.value.members.filter((member: any) => member.id !== memberId)
    } else {
      console.error('Failed to remove member', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// Add a workspace member
const addMember = async (email: string) => {
  if (email == userEmail) {
    inputMemberError.value = 'You cannot add yourself as a member'
    inputMemberEmail.value = ''
    return
  }
  try {
    // Fetch the workspace details
    const response = await axios.post(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/member/create/`, {
      email: email
    })
    inputMemberEmail.value = ''
    if (response.data.status === 201) {
      const user = await fetchUser(response.data.member.user_id)
      const newMember = {
        id: response.data.member.user_id,
        name: user.name,
        email: user.email,
        role: response.data.member.role
      }
      workspace.value.members.push(newMember)
      inputMemberError.value = null
    } else {
      console.error('Failed to add member', response)
      inputMemberError.value = response.data.error
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch the workspace details
const fetchWorkspace = async () => {
  try {
    // Fetch the workspace details
    const response = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/`)

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
    const response = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/boards/`)

    if (response.data.status === 200) {
      workspace.value.boards = []
      for (const board of response.data.boards) {
        if (isOwner.value) {
          workspace.value.boards.push(board)
          continue
        }
        const res = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/board/${board.id}/members`)
        for (const member of res.data.members) {
          if (member.user_id === userId.value && member.board_id === board.id) {
            workspace.value.boards.push(board)
            break
          }
        }
      }
    } else {
      console.error('Failed to fetch workspace boards', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch a user
const fetchUser = async (userId: string) => {
  try {
    const response = await axios.get(`/api/user/${userId}/`)

    if (response.status === 200) {
      return response.data.user
    } else {
      console.error('Failed to fetch user', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch all workspace members
const fetchWorkspaceMembers = async () => {
  try {
    const response = await axios.get(`/api/user/${workspaceUserId.value}/workspace/${workspaceId.value}/members/`)

    if (response.data.status === 200) {
      const members = response.data.members
      console.log('Members', members)
      workspace.value.members = []
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
      console.error('Failed to fetch workspace members', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch info about the owner
const fetchOwner = async () => {
  try {
    const response = await axios.get(`/api/user/${workspaceUserId.value}/`)

    console.log(response)
    if (response.data.status === 200) {
      console.log('Owner', response.data.user)
      workspace.value.owner = response.data.user
      console.log('Owner', workspace.value.owner)
      if (workspace.value.owner.email === userEmail) {
        console.log('Owner')
        isOwner.value = true
      }
    } else {
      console.error('Failed to fetch owner', response)
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchRealUser = async () => {
  try {
    const response = await axios.get(`/api/user/mail?email=${userEmail}`)

    if (response.status === 200) {
      userId.value = response.data.user.id
    } else {
      console.error('Failed to fetch user', response)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async() => {
  await fetchRealUser()
  await fetchWorkspace()
  await fetchOwner()
  await fetchWorkspaceBoards()
  await fetchWorkspaceMembers()
})
</script>

<style>
</style>
