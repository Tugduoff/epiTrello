<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">epiTrello</h1>
    </div>

    <h2 class="text-md font-bold mb-4 text-slate-600 text-center">Log out of epiTrello</h2>

    <div class="flex flex-row justify-start items-center gap-6 mb-4">
      <img src="@/assets/img/sleepPanda.png" alt="" class="w-12 h-12 rounded-full object-cover" />
      <div class="flex flex-col justify-between items-start">
        <p class="text-lg text-slate-700" v-if="user && user.name">{{ user.name }}</p>
        <p class="text-sm text-slate-600" v-if="user && user.email">{{ user.email }}</p>
      </div>
    </div>
    <button
      @click="handleLogout"
      class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-red-200"
    >
      Logout
    </button>
    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/vue';
import axios from 'axios';

const router = useRouter();
const error = ref('');
const user = ref<{
  name?: string,
  email?: string
}>({})
const userEmail = Cookies.get('user')

const handleLogout = async () => {
  try {
    // Remove the token from cookies
    const email = Cookies.get('user');

    await axios.post('/api/auth/logout', { email });

    Cookies.remove('token');
    Cookies.remove('user');

    router.push('/login');

    console.log('User logged out');
  } catch (err) {
    error.value = 'Logout failed. Please try again.';
  }
};

async function fetchRealUser() {
  try {
    const res = await axios.get(`/api/user/mail?email=${userEmail}`)

    if (res.data.status === 200) {
      user.value = res.data.user
    } else {
      console.error('Failed to fetch user', res)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchRealUser()
})
</script>

<style scoped>
</style>
