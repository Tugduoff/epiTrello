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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
/* Additional custom styles (if any) */
</style>
