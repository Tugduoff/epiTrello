<template>
  <div class="bg-slate-100">
    <NuxtLayout name="user-layout">
      <div class="z-10 flex items-center justify-center flex-col m-auto mt-6 gap-8">
        <CreateBoardForm :userId="userId" :workspaceId="workspaceId" />
        <button
          @click="back"
          class="p-3 bg-blue-500 text-white rounded-md font-bold text-sm px-12">
          Back to boards
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = ref<string>(route.params.userId as string)
const workspaceId = ref<string>(route.params.workspaceId as string)

function back() {
  router.back();
}
</script>

<style>

</style>
