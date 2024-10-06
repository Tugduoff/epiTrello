<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const localePath = useLocalePath()

onMounted(() => {
  const token = Cookies.get('token')
  if (token) {
    console.log('User is logged in')
  } else {
    console.log('User is not logged in')
    const signupRoute = localePath({ name: 'signup' })
    router.push(signupRoute)
  }
})
</script>

<style scoped>
</style>
