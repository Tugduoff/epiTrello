<template>
  <div class="flex flex-col min-h-screen">
    <Navbar :color="color" :key="color" />
    <main class="adjusted-height">
      <slot class="h-full" />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
import Cookies from 'js-cookie';

const color = ref<string>(Cookies.get('boardColor') || '#f1f5f9');

watch(() => Cookies.get('boardColor'), (newColor) => {
  color.value = newColor || '#f1f5f9';
  console.log('Color changed to', color.value);
});
console.log(color);
</script>

<style scoped>
.adjusted-height {
  height: calc(100vh - 45px);
}
</style>
