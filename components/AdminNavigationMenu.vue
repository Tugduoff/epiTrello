<template>
  <div>
    <!-- Triggers -->
    <div class="flex-full-row gap-1">
      <!-- Users Button -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer users-btn"
        @click.stop="toggleMenu(1)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">Users</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- More Button (replaces the last button when width < 1280) -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer more-btn"
        @click="toggleMenu(5)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">More</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- More Button but smaller when width < 500 -->
      <div
        id="more-btn-short"
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-1 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer more-btn"
        @click="toggleMenu(5)">
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>
    </div>

    <!-- Menus -->
    <!-- Users Menu -->
    <div
      ref="usersMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 p-1.5 absolute pb-2"
      v-if="openMenu == 1">
      <h1 class="text-gray-600 font-mono font-medium text-sm ml-3 mt-3 mb-2 text-start">Users</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <NuxtLink to="/admin/users" class="flex flex-row items-center focus:bg-gray-200 hover:bg-gray-100 rounded-md transition duration-150 p-2 gap-2">
          <Icon icon="mdi:account-multiple" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
          <p class="text-sm font-sans text-slate-600 truncate">All Users</p>
        </NuxtLink>
        <NuxtLink to="/admin/user/create" class="flex items-center focus:bg-gray-200 hover:bg-gray-100 rounded-md transition duration-150 p-2 gap-2">
          <Icon icon="solar:user-plus-broken" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
          <p class="text-sm font-sans text-slate-600 truncate">Create User</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

// Manage open/close state for the menu items
const openMenu = ref<number | null>(null)
const usersMenu = ref<HTMLElement | null>(null)

const toggleMenu = (menuNumber: number) => {
  openMenu.value = openMenu.value === menuNumber ? null : menuNumber
}

const handleClickOutside = (event: MouseEvent) => {
  if (openMenu.value == 1 && usersMenu.value && !usersMenu.value.contains(event.target as Node)) {
    openMenu.value = null
    console.log('clicked outside of Users menu')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* For width > 900: Hide "More" */
@media (min-width: 900px) {
  .more-btn {
    display: none;
  }
  #more-btn-short {
    display: none;
  }
}

/* For width < 900: Hide "Users" */
@media (max-width: 899px) {
  .users-btn {
    display: none;
  }
  .more-btn {
    display: flex;
  }
}

@media (min-width: 500px) {
  #more-btn-short {
    display: none;
  }
}

/* For width < 500: Hide "More" */
@media (max-width: 499px) {
  .more-btn {
    display: none;
  }
  #more-btn-short {
    display: flex;
  }
}
</style>
