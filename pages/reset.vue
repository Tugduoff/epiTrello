<template>
  <div>
    <h1>Reset successfull</h1>
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';

Cookies.remove('token');
Cookies.remove('user');
</script>

<style scoped>
</style>
