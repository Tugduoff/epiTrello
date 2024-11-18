<template>
  <div class="flex flex-col min-h-screen">
    <AdminNavbar />
    <main class="flex-grow p-4">
      <slot />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const token = Cookies.get('token')
  if (token) {
    console.info('User is logged in')
  } else {
    console.info('User is not logged in')
    router.push('/signup')
  }
})
</script>

<style>

</style>
