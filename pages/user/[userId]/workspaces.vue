<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Workspaces of user {{ userId }}</h1>

      <div v-if="workspaces.length === 0" class="text-center text-gray-600 text-lg">
        <p>No workspaces found</p>
      </div>
      
      <div class="mt-4 flex flex-wrap -mx-2 justify-center items-center">
        <div
          v-for="(workspace, i) in workspaces"
          :key="workspace.id"
          class="p-4 w-full sm:w-1/2 md:w-1/3 justify-center items-center"
          @click.prevent="redirectToWorkspace(workspace.id, workspace.owner_id)"
        >
          <div class="p-10 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg transition duration-200 relative">
            <p class="text-lg font-semibold text-gray-800 flex items-center">
              {{ workspace.name }}
              <span v-if="workspace.owner_id == userId" class="ml-2 text-yellow-500">
                <Icon icon="stash:crown-solid" class="w-6 h-6" />
              </span>
            </p>
            <p class="text-sm text-gray-600">{{ workspace.description }}</p>
            <p class="text-xs text-gray-400">{{ workspace.created_at }}</p>
            <p class="text-sm text-gray-500 mt-2">Members: {{ workspace.member_count }}</p>
          </div>
        </div>
      </div>

      <div 
        class="mt-10 mx-auto bg-blue-500 w-full max-w-sm p-4 rounded-lg text-center cursor-pointer text-white font-semibold text-lg transition-transform transform hover:scale-105"
        @click.prevent="redirectToCreateWorkspace()"
      >
        <p>Create a new workspace!</p>
        <p class="text-sm font-normal mt-1">Click on this box to begin creation</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()

// Get the workspaceId and userId from route params
const userId = ref<string>(route.params.userId as string)

const workspaces = ref<any>([])

const redirectToWorkspace = (workspaceId: string, workspaceOwnerId: string) => {
  console.log('Redirecting to workspace', workspaceId, 'of user', workspaceOwnerId)
  router.push(`/user/${workspaceOwnerId}/workspace/${workspaceId}`)
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

onMounted(async() => {
  workspaces.value = []
  await fetchWorkspaces()
  for (const workspace of workspaces.value) {
    await fetchWorkspaceMemberCount(workspace)
  }
})
</script>

<style>

</style>
