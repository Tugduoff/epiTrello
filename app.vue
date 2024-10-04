<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold">Welcome to My App!</h1>
    <p>This is a simple example of a layout using Radix and Tailwind.</p>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/default.vue';
</script>

<style>
.flex-full-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.flex-full-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
body {
  margin: 0;
}
h1, h2, p {
  margin: 0;
}
</style>
