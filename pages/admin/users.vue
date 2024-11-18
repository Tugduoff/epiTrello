<template>
  <div>
    <NuxtLayout name="admin-layout">
      <h1 class="text-4xl font-extrabold text-center text-slate-600 mb-6">Users</h1>
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-100 border-b border-gray-200">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users" :key="user.id"
            class="border-b hover:bg-gray-50 hover:cursor-pointer"
            @click.prevent="redirectToUser(user.id)">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="error" class="text-red-500">{{ error }}</div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Get the router
const router = useRouter()

const users = ref<any[]>([])
const error = ref<string>('')

// Call the route /api/users to retrieve all users
const fetchUsers = async () => {
  console.log('Fetching users')
  const response = await axios.get('/api/users')
  const data = response.data
  if (data.status != 200) {
    console.error('Failed to fetch users', data)
    error.value = data.message
  }
  users.value = data.users
  console.log('Users fetched', users.value)
}

fetchUsers()

const redirectToUser = (userId: string) => {
  console.log('Redirecting to user', userId)
  // Redirect to the user's workspace list page
  router.push(`/admin/user/${userId}/`)
}
</script>

<style scoped>
th {
  @apply py-2 px-4 text-left font-semibold text-gray-600;
}
td {
  @apply py-2 px-4 text-left text-gray-600;
}
</style>
