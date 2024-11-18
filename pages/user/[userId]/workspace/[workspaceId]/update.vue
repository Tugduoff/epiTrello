<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="z-0 flex items-center justify-center m-auto mt-6 flex-col gap-10">
        <UpdateWorkspaceForm :workspaceId="workspaceId" :userId="userId" />
        <div class="space-x-4">
          <!-- Back to User Dashboard Button -->
          <NuxtLink :to="`/user/${userId}/workspaces/`" class="px-4 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
            User Workspaces
          </NuxtLink>

          <!-- Delete User Button -->
          <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/delete/`" class="px-4 py-2 text-red-500 bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
            Delete Workspace
          </NuxtLink>

          <!-- See User Details Button -->
          <NuxtLink :to="`/user/${userId}/workspace/${workspaceId}/`" class="px-4 py-2 text-slate-500 bg-white border border-slate-500 rounded hover:bg-slate-500 hover:text-white transition">
            Workspace Details
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Get the route
const route = useRoute()

// Get the workspaceId and userId from route params
const workspaceId = ref<string>(route.params.workspaceId as string)
const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
