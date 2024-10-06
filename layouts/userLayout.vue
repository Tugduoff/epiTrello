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
</script>

<style scoped>
</style>
