<template>
  <NuxtLayout name="auth-layout">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-slate-800">Authenticating...</h1>
      <p class="text-slate-600">Please wait while we process your login...</p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const dashboardRoute = localePath('/dashboard');
const signupRoute = localePath('/signup');

onMounted(async () => {
  const code = route.query.code;

  if (code) {
    try {
      const response = await axios.post('/api/auth/google/callback', { code });

      if (response.data.status !== 201)
      throw new Error(response.data.body.error);

      Cookies.set('token', response.data.body.token, { expires: 1, sameSite: 'None', secure: true });
      console.log('Login successful:', response.data);
      router.push(dashboardRoute);
    } catch (err: any) {
      console.error('Error:', err);
    }
  } else {
    console.error('No code in query parameters');
    // router.push(signupRoute);
  }
});
</script>

<style scoped>
</style>
