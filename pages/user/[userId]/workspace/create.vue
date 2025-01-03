<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <div class="z-10 flex items-center justify-center flex-col m-auto mt-6 gap-8">
        <CreateWorkspaceForm :userId="userId" />
        <NuxtLink
          :to="`/user/${userId}`"
          class="p-3 bg-blue-500 text-white rounded-md font-bold text-sm px-12">
          Back to workspaces
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)
</script>

<style>

</style>
