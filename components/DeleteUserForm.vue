<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">Delete User</h1>
    </div>

    <h2 class="text-md font-bold mb-4 text-slate-600 text-center">Are you sure you want to delete this user ?</h2>

    <div class="flex flex-row justify-start items-center gap-6 mb-4 rounded-xl bg-slate-200 hover:bg-slate-300 hover:cursor-pointer p-2"
      @click="router.push(`/admin/user/${props.userId}`)">
      <img src="~/assets/img/background.jpg" alt="" class="w-12 h-12 rounded-full object-cover" />
      <div class="flex flex-col justify-between items-start">
        <p class="text-lg text-slate-800">{{ userInfo.name }}</p>
        <p class="text-sm text-slate-600">{{ userInfo.email }}</p>
      </div>
    </div>
    <button
      @click="deleteUser"
      class="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 mt-3"
    >
      Delete
    </button>
    <button
      @click="router.push(`/admin/user/${props.userId}`)"
      class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-red-200 mt-3"
    >
      Go back
    </button>
    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { Icon } from '@iconify/vue';
import axios from 'axios';

const props = defineProps<{
  userId: string;
}>();

const router = useRouter();
const error = ref('');
const userInfo = ref<{
  name: string;
  email: string;
}>({} as any);

const deleteUser = async () => {
  try {
    const response = await axios.delete(`/api/user/${props.userId}`);
    const data = response.data;

    if (data.status !== 200) {
      throw new Error(data.message);
    }

    router.push('/admin/users');

    console.log(data.message);
  } catch (err) {
    error.value = 'Logout failed. Please try again.';
  }
};

// Function to fetch user data
const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${props.userId}`);
    const data = response.data;

    if (data.status !== 200) {
      throw new Error(data.message);
    }

    userInfo.value = data.user;

    console.log('User fetched successfully:', response.data.user);
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch user.';
    console.error('Fetch error:', error.value);
  }
};

// Fetch user data on component mount
onMounted(async () => {
  fetchUser
});
</script>

<style scoped>
</style>
