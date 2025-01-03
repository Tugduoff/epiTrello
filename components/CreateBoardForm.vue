<template>
  <div class="max-w-md mx-auto p-10 bg-white shadow-lg rounded-[0.25rem] w-96">
    <div class="flex flex-row justify-center items-center gap-2 mb-6">
      <Icon icon="mdi:trello" class="text-4xl text-blue-600" />
      <h1 class="text-3xl font-bold text-center text-slate-800">epiTrello</h1>
    </div>

    <h2 class="text-md font-bold mb-4 text-slate-600 text-center">Creating a new board</h2>

    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <Field
          id="board-name"
          name="name"
          type="text"
          placeholder="Enter the name"
          v-model="form.name"
          maxlength="40"
          minlength="3"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          @click.prevent="success = null"
        />
        <ErrorMessage name="name" class="mt-1 text-red-600 text-sm text-center absolute" />
      </div>
      <div>
        <textarea
          id="board-description"
          name="description"
          v-model="form.description"
          placeholder="Enter the description"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200 resize-none h-40"
          rows="4"
        ></textarea>
        <ErrorMessage name="description" class="mt-1 text-red-600 text-sm text-center absolute" />
      </div>

      <button
      type="submit"
      class="w-full py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Create
      </button>

    </form>

    <p v-if="error" class="mt-2 text-red-600 text-center">{{ error }}</p>
    <p v-if="success" class="mt-2 text-green-600 text-center">{{ success }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Icon } from '@iconify/vue';

const error = ref<string | null>(null);
const success = ref<string | null>(null);

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const props = defineProps<{
  userId: string;
  workspaceId: string;
}>();

const userId = ref(props.userId);
const workspaceId = ref(props.workspaceId);

const form = ref({
  name: '',
  description: '',
});

// Function to handle signup form submission
const submitForm = handleSubmit(async () => {
  try {
    const response = await axios.post(`/api/user/${userId.value}/workspace/${workspaceId.value}/board/create`, {
      workspace_id: workspaceId.value,
      name: form.value.name,
      description: form.value.description,
    });
    console.log('Response:', response);
    const data = response.data;

    if (data.status !== 201) {
      throw new Error(response.data.body.error);
    }

    console.log('Board creation successful:', response.data);

    error.value = null;
    success.value = 'Board created successfully.';
  } catch (err: any) {
    error.value = err || 'Board creation failed.';
    success.value = null;
  }
});
</script>

<style scoped>
</style>
