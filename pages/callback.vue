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

onMounted(async () => {
  const code = route.query.code;

  if (code) {
    try {
      const response = await axios.post('/api/auth/google/callback', { code });

      if (response.data.status !== 201)
        throw new Error(response.data.body.error);

      const email = response.data.body.email;
      const token = response.data.body.token;

      Cookies.set('token', token, { expires: 1, sameSite: 'None', secure: true });
      Cookies.set('user', email, { expires: 1, sameSite: 'None', secure: true });

      console.log('Login successful:', response.data);

      try {
        const response2 = await axios.get('/api/auth/user-id',
          {
            params: {
              email
            }
          }
        )

        if (response2.status !== 200)
          router.push('/login');

        router.push('/user/' + response2.data.body.id);
      } catch (error) {
        console.error('Error:', error);
        router.push('/login');
      }
    } catch (err: any) {
      console.error('Error:', err);
    }
  } else {
    console.error('No code in query parameters');
  }
});
</script>

<style scoped>
</style>
