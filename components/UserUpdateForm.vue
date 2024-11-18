<template>
  <div class="max-w-md mx-auto p-10 bg-white shadow-lg rounded-lg w-96">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">Edit User</h1>
    </div>

    <p class="text-gray-600 mb-4 text-center">
      Please update the fields below to modify your user information.
    </p>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="signup-name" class="block text-gray-700 font-medium mb-1">Name</label>
        <Field
          id="signup-name"
          name="name"
          type="text"
          placeholder="Enter your name"
          v-model="form.name"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          @click="success = null"
        />
        <ErrorMessage name="name" class="mt-1 text-red-600 text-sm" />
      </div>

      <div>
        <label for="signup-email" class="block text-gray-700 font-medium mb-1">Email</label>
        <Field
          id="signup-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          v-model="form.email"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          @click="success = null"
        />
        <ErrorMessage name="email" class="mt-1 text-red-600 text-sm" />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Update
      </button>
    </form>

    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
    <p v-if="success" class="mt-2 text-green-600 text-center">{{ success }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  userId: string;
}>();

const router = useRouter();
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

// Setup form handling
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
});

// Form state
const form = ref({
  name: '',
  email: '',
});

// Function to handle form submission
const submitForm = handleSubmit(async () => {
  try {
    const response = await axios.put(`/api/user/${props.userId}`, form.value);
    const data = response.data;

    if (data.status !== 200) {
      throw new Error(response.data.message);
    }

    console.log('User updated successfully:', response.data);

    error.value = null; // Clear any previous errors
    success.value = 'User updated successfully!'; // Set success message
  } catch (err: any) {
    error.value = err.message || 'Update failed.';
    success.value = null; // Clear any previous success messages
    console.error('Update error:', error.value);
  }
});

// Function to fetch user data
const fetchUser = async () => {
  try {
    const response = await axios.get(`/api/user/${props.userId}`);
    
    if (response.data.status !== 200) {
      throw new Error(response.data.message);
    }

    // Set fetched user data to form
    setValues({
      name: response.data.user.name,
      email: response.data.user.email,
    });

    console.log('User fetched successfully:', response.data.user);
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch user.';
    console.error('Fetch error:', error.value);
  }
};

// Fetch user data on component mount
onMounted(fetchUser);
</script>

<style scoped>
</style>
