<template>
  <NuxtLayout name="user-layout" :key="board.color">
    <!-- Settings Header -->
    <div class="h-16 w-full flex justify-between items-center px-6 bg-slate-200 rounded-lg shadow-md mb-4">
      <p class="text-2xl font-semibold text-slate-800 w-1/3">Board Settings</p>

      <p v-if="board.name" class="text-lg font-semibold px-2">{{ board.name }}</p>

      <div class="flex gap-4 w-1/3 flex-row justify-end">
        <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/board/${boardId}`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-200 hover:text-black hover:border-slate-900 border-slate-200 border-2 transition duration-300">Back</NuxtLink>
        <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/boards`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-200 hover:text-black hover:border-slate-900 border-slate-200 border-2 transition duration-300">Boards</NuxtLink>
        <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/`" class="text-white py-1.5 bg-slate-900 rounded-xl px-6 hover:bg-slate-200 hover:text-black hover:border-slate-900 border-slate-200 border-2 transition duration-300">Workspace</NuxtLink>
      </div>
    </div>

    <!-- Board Settings -->
    <div class="w-full flex flex-col px-6 py-4 bg-slate-200 rounded-lg shadow-md mb-4 gap-2">
      <h2 class="text-2xl font-semibold text-slate-800">Details</h2>
      <form @submit.prevent="updateBoardSettings">
        <div class="mb-4">
          <label for="boardName" class="block text-sm font-medium text-gray-700">Board Name</label>
          <input
            id="boardName"
            v-model="boardInput.name"
            type="text"
            class="mt-1 block w-full px-4 py-2 border border-none rounded-md bg-white"
            maxlength="40"
            minlength="3"
            placeholder="Enter board name"
          />
        </div>

        <div class="mb-4">
          <label for="boardDescription" class="block text-sm font-medium text-gray-700">Board Description</label>
          <textarea
            id="boardDescription"
            v-model="boardInput.description"
            rows="4"
            class="mt-1 block w-full px-4 py-2 border bg-white border-none rounded-md max-h-56"
            placeholder="Enter board description"
          ></textarea>
        </div>

        <!-- Board color -->
        <div class="mb-4">
          <label for="boardColor" class="block text-sm font-medium text-gray-700">Board Color</label>
          <input
            id="boardColor"
            v-model="boardInput.color"
            type="color"
            class="mt-1 block w-full border-none rounded-md bg-transparent cursor-pointer"
          />
        </div>

        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-80">
          Save Board Details
        </button>
      </form>
    </div>

    <!-- Labels Management -->
    <div class="w-full flex flex-col px-6 py-4 bg-slate-200 rounded-lg shadow-md mb-4 gap-2">
      <h2 class="text-2xl font-semibold text-slate-800">Manage Labels</h2>
      <div>
        <label for="labelName" class="block text-sm font-medium text-gray-700">Label Name</label>
        <input
          id="labelName"
          v-model="newLabelName"
          @focus="labelError = false"
          maxlength="40"
          minlength="3"
          type="text"
          class="mt-1 block w-full px-4 py-2 border border-none bg-white rounded-md"
          placeholder="Enter label name"
        />
      </div>

      <div class="mb-4">
        <!-- Label Color Picker -->
        <label for="labelColor" class="block text-sm font-medium text-gray-700">Label Color</label>
        <input
          id="labelColorPicker"
          type="color"
          v-model="newLabelColor"
          class="mt-1 block w-full border-none rounded-md bg-transparent cursor-pointer"
          @input="syncTextColor"
        />
      
        <!-- Label Color Text Input -->
        <input
          id="labelColorText"
          type="text"
          v-model="newLabelColorText"
          class="mt-1 block w-full px-4 py-2 border border-none bg-white rounded-md"
          placeholder="Enter label color in hex (e.g., #FF5733)"
          @input="syncPickerColor"
        />
      </div>

      <!-- Create Label Button -->
      <button
        type="submit"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-80"
        @click="createLabel"
      >
        Create Label
      </button>

      <p v-if="labelError" class="text-red-600 text-sm">Label name is required for label creation.</p>

      <!-- Display Existing Labels -->
      <div class="mt-2">
        <h3 class="text-lg font-semibold mb-2">Existing Labels</h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="(label, index) in labels"
            :key="index"
            class="flex items-center gap-2 p-2 border border-gray-300 rounded-md"
          >
            <span :style="{ backgroundColor: label.color }" class="w-6 h-6 rounded-full"></span>
            <span>{{ label.name }}</span>
            <button
              @click="removeLabel(label.id)"
            >
              <Icon icon="material-symbols:close" class="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Manage Members -->
    <div class="w-full flex flex-col px-6 py-4 bg-slate-200 rounded-lg shadow-md mb-4 gap-2">
      <h2 class="text-2xl font-semibold text-slate-800">Manage Members</h2>
      <div class="mb-4">
        <label for="memberSelect" class="block text-sm font-medium text-gray-700">Select Member</label>
        <select
          id="memberSelect"
          @focus="memberError = false"
          v-model="selectedMemberEmail"
          class="mt-1 block w-full px-4 py-2 border border-none bg-white rounded-md"
        >
          <option value="" disabled>Select a member</option>
          <option
            v-for="member in workspaceMembers"
            :key="member.id"
            :value="member.email"
          >
            {{ member.email }}
          </option>
        </select>
      </div>

      <button
        @click="addMember"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-80"
      >
        Add Member to Board
      </button>

      <p v-if="memberError" class="text-red-600 text-sm">User is already a member or hasn't been selected.</p>

      <!-- Display Added Members -->
      <div class="mt-2">
        <h3 class="text-lg font-semibold mb-2">Members</h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="member in boardMembers"
            :key="member.id"
            class="flex items-center gap-2 p-2 border border-gray-300 rounded-md"
          >
            <span>{{ member.email }}</span>
            <button
              @click="removeMember(member.id)"
            >
              <Icon icon="material-symbols:close" class="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Icon } from '@iconify/vue'
import Cookies from 'js-cookie'

const route = useRoute()

// Get the userId, workspaceId, and boardId from route params
const userId = route.params.userId as string
const workspaceId = route.params.workspaceId as string
const boardId = route.params.boardId as string

// Data binding
const board = ref<{
  name: string,
  description: string,
  color: string
}>({
  name: '',
  description: '',
  color: '#ffffff'
})

const boardInput = ref<{
  name: string,
  description: string,
  color: string
}>({
  name: '',
  description: '',
  color: '#ffffff'
})

const newLabelName = ref('')
const newLabelColor = ref('#000000')
const newLabelColorText = ref('#000000'); // Default color for text input
const selectedMemberEmail = ref('')
const labels = ref<{ name: string, color: string, id: number }[]>([])
const boardMembers = ref<any>([])
const labelError = ref(false)
const memberError = ref(false)

// Sync text input with color picker
const syncTextColor = () => {
  newLabelColorText.value = newLabelColor.value;
};

// Sync color picker with text input
const syncPickerColor = () => {
  if (/^#[0-9A-Fa-f]{6}$/.test(newLabelColorText.value)) {
    newLabelColor.value = newLabelColorText.value;
  }
};

// Dummy data for workspace members
const workspaceMembers = ref<any>([])

// Methods for Board Settings
const updateBoardSettings = async () => {
  board.value.name = boardInput.value.name
  board.value.description = boardInput.value.description
  board.value.color = boardInput.value.color

  Cookies.set('boardColor', board.value.color)

  const res = await axios.put(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}`, {
    name: boardInput.value.name,
    description: boardInput.value.description,
    color: boardInput.value.color
  })

  console.log('Board settings updated:', res)
}

// Methods for Label Management
const createLabel = async () => {
  if (!newLabelName.value.trim() || !newLabelColor.value) {
    console.error('Label name is required')
    labelError.value = true
    return
  }
  const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/label/create`, {
    name: newLabelName.value,
    color: newLabelColor.value
  })
  if (res.data.status !== 201) {
    console.error('Failed to create label:', res)
    return
  }
  console.log('Label created:', res.data)
  labels.value.push({ name: newLabelName.value, color: newLabelColor.value, id: res.data.label.id })
  newLabelName.value = ''
  newLabelColor.value = '#000000'
  newLabelColorText.value = '#000000'
}

const removeLabel = async (id: number) => {
  const index = labels.value.findIndex((label: any) => label.id === id)
  const res = await axios.delete(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/label/${id}`)
  if (res.data.status !== 204) {
    console.error('Failed to remove label:', res)
    return
  }
  console.log('Label removed:', res)
  labels.value.splice(index, 1)
}

// Methods for Member Management
const addMember = async () => {
  if (!selectedMemberEmail.value) {
    console.error('Member not selected')
    memberError.value = true
    return
  }
  const alreadyExists = boardMembers.value.find((member: any) => member.email === selectedMemberEmail.value)
  if (alreadyExists) {
    console.error('Member already exists')
    selectedMemberEmail.value = ''
    memberError.value = true
    return
  }
  const res = await axios.post(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/member/create`, {
    email: selectedMemberEmail.value
  })
  if (res.data.status !== 201) {
    console.error('Failed to add member:', res)
    selectedMemberEmail.value = ''
    memberError.value = true
    return
  }
  boardMembers.value.push({
    id: res.data.member.user_id,
    email: selectedMemberEmail.value
  })
  selectedMemberEmail.value = ''
  console.log('Member added:', res.data)
}

const removeMember = async (id: number) => {
  const index = boardMembers.value.findIndex((member: any) => member.id === id)
  const res = await axios.delete(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/member/${id}`)
  if (res.data.status !== 204) {
    console.error('Failed to remove member:', res)
    return
  }
  console.log('Member removed:', res)
  boardMembers.value.splice(index, 1)
}

onMounted(async () => {
  // Fetch board details
  let res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}`);
  console.log('Board fetched:', res.data)

  board.value.name = res.data.board.name
  board.value.description = res.data.board.description
  board.value.color = res.data.board.color

  boardInput.value.name = res.data.board.name
  boardInput.value.description = res.data.board.description
  boardInput.value.color = res.data.board.color

  // Fetch labels
  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/labels`)
  labels.value = res.data.labels

  console.log('Labels:', labels.value)

  // Fetch board members
  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/members`)

  for (const member of res.data.members) {
    res = await axios.get(`/api/user/${member.user_id}/`)
    workspaceMembers.value.push({
      id: member.user_id,
      email: res.data.user.email
    })
  }

  console.log('Workspace members:', workspaceMembers.value)

  res = await axios.get(`/api/user/${userId}/workspace/${workspaceId}/board/${boardId}/members`)

  for (const member of res.data.members) {
    res = await axios.get(`/api/user/${member.user_id}/`)
    console.log(res.data)
    boardMembers.value.push({
      id: member.user_id,
      email: res.data.user.email
    })
  }

  console.log('Board members:', boardMembers.value)
})
</script>

<style scoped>
</style>
