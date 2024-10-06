<template>
  <div class="relative min-h-screen">
    <!-- Flex container to center the form -->
    <div class="relative z-10 flex items-center justify-center min-h-screen">
      <slot /> <!-- Slot for the LoginForm or SignupForm -->
    </div>

    <!-- Background image that stays at the bottom left -->
    <img
      src="~/assets/img/authBgLeft.jpg"
      alt=""
      class="absolute bottom-0 left-0 h-auto max-w-96"
    />

    <!-- Background image that stays at the bottom right -->
    <img
      src="~/assets/img/authBgRight.jpg"
      alt=""
      class="absolute bottom-0 right-0 h-auto max-w-96"
    />
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
@media (max-width: 800px) {
  img {
    display: none;
  }
}
@media (min-width: 800px) and (max-width: 1200px) {
  img {
    width: 35%;
  }
}
</style>
