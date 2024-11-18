<template>
  <div>
    <NuxtLayout name="admin-layout">
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
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()

const userId = ref<string>(route.params.userId as string)

// Check for authentication on mount
onMounted(() => {
  const token = Cookies.get('token');
  if (!token) {
    console.info('User is not logged in, redirecting to dashboard');
    router.push('/dashboard');
  } else {
    console.info('User is already logged in');
  }
});
</script>

<style>

</style>
