<template>
  <div>
    <Icon
      id="searchIconShort"
      icon="mdi:magnify" alt=""
      class="w-6 h-6 text-blue-600 mt-[0.2rem] cursor-pointer"
      />
    <Icon
      id="searchIcon"
      icon="mdi:magnify" alt=""
      class="w-5 h-5 text-slate-500 absolute mt-1 z-20"
      :class="searchBarOpen ? 'ml-[-49.75rem]' : 'ml-1'"
      />
    <input
      id="searchBar"
      @click.stop="openSearchBar"
      type="text"
      class="h-7 border border-slate-400 rounded-[0.25rem] p-2 focus:outline-none focus:border-blue-500 text-slate-700 pl-7 text-sm"
      :placeholder="searchBarOpen ? 'Search Trello' : 'Search'"
      :value="search"
      :class="searchBarOpen ? 'w-[50rem] absolute z-10 ml-[-50rem]' : 'w-[13rem]'"
    />
    <div
      ref="searchBar"
      class="bg-white text-black rounded-lg shadow-lg ml-[-50rem] w-[50rem] mt-[37px] border border-gray-100 absolute"
      v-if="searchBarOpen">
      <div class="flex flex-col text-start justify-between">
        <div class="flex flex-row justify-start items-center">
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-2 mb-2 text-start pl-2">RECENT BOARDS</h1>
        </div>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-full hover:bg-slate-100 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-full hover:bg-slate-100 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-full hover:bg-slate-100 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
      </div>
      <div class="mt-2 flex flex-col text-start justify-between cursor-pointer hover:bg-slate-100 px-4 border-t-[1px] border-solid border-slate-200">
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row justify-start items-center">
            <Icon icon="ph:magnifying-glass-bold" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
            <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-3 mb-2 text-start">Advanced Search</h1>
          </div>
          <Icon icon="tabler:arrow-back" alt="" class="w-6 h-6 text-slate-500 bg-slate-100 p-1 rounded-[0.25rem]" />
        </div>
      </div>
      <div class="flex flex-col text-center justify-center cursor-pointer bg-slate-100 px-4">
        <a href="#" class="hover:text-blue-700 text-slate-700 text-sm underline py-4">Help us improve your search results!</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';

const search = ref("")
const searchBarOpen = ref(false)
const searchBar = ref<HTMLElement | null>(null)

const openSearchBar = () => {
  searchBarOpen.value = true
  console.log('clicked Search Bar')
}

const handleClickOutside = (event: MouseEvent) => {
  if (searchBarOpen.value && searchBar.value && !searchBar.value.contains(event.target as Node)) {
    searchBarOpen.value = false
    console.log('clicked outside of search bar')
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
@media (min-width: 790px) {
  #searchIconShort {
    display: none;
  }
}
@media (max-width: 789px) {
  #searchIcon {
    display: none;
  }
  #searchBar {
    display: none;
  }
}
</style>