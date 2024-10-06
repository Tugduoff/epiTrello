<template>
  <div class="max-w-md mx-auto p-10 bg-white shadow-lg rounded-[0.25rem] w-96">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">epiTrello</h1>
    </div>

    <h2 class="text-md font-bold mb-4 text-slate-600 text-center">Log in to continue</h2>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <Field
          id="login-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          v-model="form.email"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <ErrorMessage name="email" class="mt-1 text-red-600 text-sm" />
      </div>

      <div>
        <Field
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          v-model="form.password"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <ErrorMessage name="password" class="mt-1 text-red-600 text-sm" />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Log In
      </button>

      <p v-if="error" class="mt-2 text-red-600">{{ error }}</p>
    </form>

    <div class="mt-4 text-center">
      <NuxtLink :to="localePath('/signup')" class="text-blue-600 hover:underline text-sm">Don't have an account? Sign Up</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useLocalePath } from '#i18n';
import { Icon } from '@iconify/vue';

const localePath = useLocalePath();
const router = useRouter();
const error = ref('');

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const form = ref({
  email: '',
  password: ''
});

// Function to handle login form submission
const submitForm = handleSubmit(async () => {
  try {
    const response = await axios.post('/api/auth/login', form.value);

    if (response.data.status !== 200)
      throw new Error(response.data.body.error);

    Cookies.set('token', response.data.body.token, { expires: 1, sameSite: 'None', secure: true });
    console.log('Login successful:', response.data);

    error.value = '';

    const dashboardRoute = localePath({ name: 'dashboard' });
    router.push(dashboardRoute);

    console.log('User logged in');
  } catch (err: any) {
    error.value = err || 'Login failed.';
  }
});

onMounted(() => {
  const token = Cookies.get('token');
  if (token) {
    console.log('User is already logged in');
    const dashboardRoute = localePath({ name: 'dashboard' });
    router.push(dashboardRoute);
  } else {
    console.log('User is not logged in');
  }
});
</script>

<style scoped>
</style>
