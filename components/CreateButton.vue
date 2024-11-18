<template>
  <div>
    <button @click.stop="openCreateMenu" id="createButton" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
      Create
    </button>
    <button @click.stop="openCreateMenu" id="createShortButton" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-[0.25rem] px-[0.25rem] rounded mt-[-0.1rem]">
      <Icon icon="mdi:plus" class="w-6 h-6 text-white" />
    </button>
    <div
      ref="createMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[7px] border border-gray-100 absolute"
      v-if="showCreateMenu">
      <div class="flex flex-col text-start justify-between cursor-pointer hover:bg-slate-100 px-4">
        <div class="flex flex-row justify-start items-center"
          @click="redirectToCreate()">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-2 mb-2 text-start">Create board</h1>
        </div>
        <p class="text-sm text-slate-700 pb-3">A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
      </div>
      <div class="flex flex-col text-start justify-between cursor-pointer hover:bg-slate-100 px-4">
        <div class="flex flex-row justify-start items-center">
          <Icon icon="octicon:project-template-16" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-3 mb-2 text-start">Start with a template</h1>
        </div>
        <p class="text-sm text-slate-700 pb-3">Get started faster with a board template.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'

const showCreateMenu = ref(false)
const createMenu = ref<HTMLElement | null>(null)

const router = useRouter()
const route = useRoute()

const redirectToCreate = () => {
  console.log('redirecting to create board')
  if (!route.params.userId || !route.params.workspaceId)
    throw new Error('userId and workspaceId are required to create a board')
  router.push(`/user/${route.params.userId}/workspace/${route.params.workspaceId}/board/create`)
}

const openCreateMenu = () => {
  showCreateMenu.value = !showCreateMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (showCreateMenu.value && createMenu.value && !createMenu.value.contains(event.target as Node)) {
    showCreateMenu.value = false
    console.log('clicked outside of Create menu')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
@media (min-width: 1279px) {
  #createShortButton {
    display: none;
  }
}
@media (max-width: 1279px) {
  #createButton {
    display: none;
  }
}
</style>
