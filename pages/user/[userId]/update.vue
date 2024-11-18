<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="z-0 flex items-center justify-center m-auto mt-6 flex-col gap-10">
        <UserUpdateForm :userId="userId" />
        <div class="space-x-4">
          <!-- Back to User Dashboard Button -->
          <NuxtLink :to="`/user/${userId}/dashboard`" class="px-4 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
            User Dashboard
          </NuxtLink>

          <!-- Delete User Button -->
          <NuxtLink :to="`/user/${userId}/delete`" class="px-4 py-2 text-red-500 bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
            Delete User
          </NuxtLink>

          <!-- See User Details Button -->
          <NuxtLink :to="`/user/${userId}`" class="px-4 py-2 text-slate-500 bg-white border border-slate-500 rounded hover:bg-slate-500 hover:text-white transition">
            User Details
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["redirect-user-if-unauthorized"]
})

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
