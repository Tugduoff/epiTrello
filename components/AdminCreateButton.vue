<template>
  <div>
    <button @click.stop="openCreateMenu" id="createButton" class="bg-red-500 hover:bg-red-700 text-white font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
      Create
    </button>
    <button @click.stop="openCreateMenu" id="createShortButton" class="bg-red-500 hover:bg-red-700 text-white font-medium py-[0.25rem] px-[0.25rem] rounded mt-[-0.1rem]">
      <Icon icon="mdi:plus" class="w-6 h-6 text-white" />
    </button>
    <div
      ref="createMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[7px] border border-gray-100 absolute"
      v-if="showCreateMenu">

      <NuxtLink to="/admin/user/create" class="flex flex-col focus:bg-gray-200 rounded-md transition duration-150 p-2 hover:bg-gray-100">
        <div class="flex flex-row justify-start items-center">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-2 mb-2 text-start">Create a user</h1>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const showCreateMenu = ref(false)
const createMenu = ref<HTMLElement | null>(null)

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
