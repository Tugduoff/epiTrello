<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">epiTrello</h1>
    </div>

    <h2 class="text-md font-bold mb-4 text-slate-600 text-center">Log out of epiTrello</h2>

    <div class="flex flex-row justify-start items-center gap-6 mb-4">
      <img src="~/assets/img/background.jpg" alt="" class="w-12 h-12 rounded-full object-cover" />
      <div class="flex flex-col justify-between items-start">
        <p class="text-lg text-slate-800">{{ userInfo.name }}</p>
        <p class="text-sm text-slate-600">{{ userInfo.email }}</p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/vue';

const localePath = useLocalePath();
const router = useRouter();
const error = ref('');
const userInfo = ref({
  name: 'Sleepy Panda',
  email: 'sleepyPanda@gmail.com',
});

const handleLogout = () => {
  try {
    // Remove the token from cookies
    Cookies.remove('token');

    const loginRoute = localePath({ name: 'login' });
    router.push(loginRoute);

    console.log('User logged out');
  } catch (err) {
    error.value = 'Logout failed. Please try again.';
  }
};
</script>

<style scoped>
</style>
