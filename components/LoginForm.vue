<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="login-email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="login-email"
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <label for="login-password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="login-password"
          v-model="form.password"
          type="password"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Login
      </button>
      <p v-if="error" class="mt-2 text-red-600">{{ error }}</p>
    </form>

    <div class="mt-2">
      <button
        @click="loginWithGoogle"
        class="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:google" class="text-lg" /> Log In with Google
      </button>
    </div>

    <div class="mt-4 text-center">
      <NuxtLink :to="localePath('/signup')" class="text-blue-600 hover:underline text-sm">Don't have an account? Sign Up</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const localePath = useLocalePath();
const router = useRouter();
const form = ref({
  email: '',
  password: ''
});
const error = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/auth/login', form.value);
    Cookies.set('token', response.data.body.token, { expires: 1, sameSite: 'None', secure: true });
    console.log('Login successful:', response.data);

    error.value = '';

    const dashboardRoute = localePath({ name: 'dashboard' })
    router.push(dashboardRoute);
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Login failed.';
  }
};

const loginWithGoogle = async () => {
  try {
    const response = await axios.get('/api/auth/google/request');

    window.location.href = response.data.authUrl;
  } catch (err: any) {
    error.value = 'Google log-in failed';
    console.error(err);
  }
};

onMounted(() => {
  const token = Cookies.get('token');
  if (token) {
    console.info('User is already logged in');
    const dashboardRoute = localePath({ name: 'dashboard' });
    router.push(dashboardRoute);
  } else {
    console.info('User is not logged in');
  }
});
</script>

<style scoped>
/* Any additional styles can go here */
</style>
