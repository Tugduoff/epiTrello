<template>
  <div>
    <!-- Trigger Button -->
    <div
      class="rounded-sm bg-transparent w-7 h-7 hover:bg-slate-200 cursor-pointer"
      @click.stop="handleClick">
      <Icon icon="gg:menu-grid-o" class="w-full h-full p-1 text-slate-600" />
    </div>
    <!-- Menu Content -->
    <div
      ref="dropdownMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 p-1.5 absolute left-0 h-3/4"
      v-if="showModal">
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-3 mt-8 mb-2 text-start">YOUR APPS</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <a href="#" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 h-12">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 bg-blue-700 text-white p-2 rounded-md ml-2" />
          <p class="ml-2 text-md font-sans text-slate-600">Trello</p>
        </a>
      </div>
      <div class="flex flex-col text-start justify-between px-1 mb-1">
        <a href="#" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 h-12">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 bg-green-500 text-white p-2 rounded-md ml-2" />
          <p class="ml-2 text-md font-sans text-gray-700">Trellote</p>
        </a>
      </div>
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-3 mt-8 mb-2 text-start">DISCOVER MORE PRODUCTS</h1>
      <div class="flex flex-col text-start justify-between px-1 mb-1">
        <a href="#" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 h-12">
          <Icon icon="mdi:compass" alt="" class="w-8 h-8 bg-slate-200 text-gray-500 p-1 rounded-md ml-2" />
          <p class="ml-2 text-sm font-sans text-gray-700 font-medium">More EpiTrello Products</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const showModal = ref(false)
const dropdownMenu = ref<HTMLElement | null>(null)

const handleClick = () => {
  showModal.value = !showModal.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (showModal.value && dropdownMenu.value && !dropdownMenu.value.contains(event.target as Node)) {
    showModal.value = false
    console.log('clicked outside of Dropdown Menu')
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
</style>
