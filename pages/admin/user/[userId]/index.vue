<template>
  <div>
    <NuxtLayout name="admin-layout">
      <h1 class="text-4xl font-extrabold text-center text-slate-600 mb-6">User</h1>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-if="user.id" class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <div class="text-2xl font-bold">{{ user.name }}</div>
          <div class="text-lg">{{ user.email }}</div>
          <div class="text-lg">{{ user.created_at }}</div>
        </div>
        <div class="mt-4">
          <NuxtLink :to="'/user/' + user.id + '/update'" class="text-blue-600 hover:underline">Edit</NuxtLink>
          <NuxtLink :to="'/user/' + user.id + '/delete'" class="text-red-600 hover:underline ml-4">Delete</NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)
const error = ref<string>('')
const user = ref<any>({})

const fetchUser = async () => {
  console.log('Fetching user', userId.value)
  const response = await axios.get('/api/user/' + userId.value)
  const data = response.data
  if (data.status != 200) {
    console.error('Failed to fetch user', data)
    error.value = data.message
  }
  user.value = data.user
  console.log('User fetched', user.value)
}

fetchUser()
</script>

<style>

</style>
