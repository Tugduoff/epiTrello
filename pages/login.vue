<template>
  <div>
    <NuxtLayout name="auth-layout">
      <LoginForm />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["redirect-user-if-logged"]
})
</script>

<style scoped>
</style>
