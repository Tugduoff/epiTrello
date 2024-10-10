<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="mb-4">
        <label for="signup-name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="signup-name"
          v-model="form.name"
          type="text"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <label for="signup-email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="signup-email"
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="mb-4">
        <label for="signup-password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="signup-password"
          v-model="form.password"
          type="password"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <ErrorMessage name="password" class="text-red-600 text-sm text-center absolute" />
      </div>

      <button
      type="submit"
      class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Sign Up
      </button>

    </form>

    <div class="mt-2">
      <button
      @click="signupWithGoogle"
      class="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:google" class="text-lg" /> Sign Up with Google
      </button>
    </div>

    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>

    <div class="mt-4 text-center">
      <NuxtLink :to="localePath('/login')" class="text-blue-600 hover:underline text-sm">Already have an account? Login</NuxtLink>
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
  name: '',
  email: '',
  password: ''
});
const error = ref('');

const handleSignup = async () => {
  try {
    const response = await axios.post('/api/auth/signup', form.value);

    Cookies.set('token', response.data.body.token, { expires: 1, sameSite: 'None', secure: true });
    console.log('Signup successful:', response.data);

    error.value = '';

    const dashboardRoute = localePath({ name: 'dashboard' })
    router.push(dashboardRoute);
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Signup failed.';
  }
};

const signupWithGoogle = async () => {
  try {
    const response = await axios.get('/api/auth/google/request');

    window.location.href = response.data.authUrl;
  } catch (err: any) {
    error.value = 'Google sign-in failed';
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
</style>
