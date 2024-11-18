<template>
  <nav class="p-2 border-solid border-b-[1px] border-gray-200">
    <div class="flex justify-between text-center flex-row w-full">
      <div class="flex flex-row justify-start text-center gap-1">
        <div class="flex flex-row justify-start items-center">
          <DropdownHomeMenu class="h-7"/>
          <AdminTitleButton class="h-7"/>
          <AdminNavigationMenu class="h-7"/>
        </div>
        <AdminCreateButton class="h-7"/>
      </div>
      <div class="flex flex-row justify-end text-center gap-1.5">
        <SearchBar class="h-7"/>
        <HelpButton class="h-7"/>
      </div>
    </div>
  </nav>
  <div class="p-5">
    <section class="w-full pt-8 pb-12 bg-gray-600 text-white rounded-xl">
      <div class="max-w-6xl mx-auto text-center">
        <Icon icon="mdi:trello" class="text-6xl mx-auto text-white mb-4" />
        <h1 class="text-4xl font-bold mb-4">Welcome to epiTrello Admin</h1>
        <p class="text-lg font-medium">
          Manage users, create, update and delete them. Get the latests statistics and more.
        </p>
        <div class="mt-6 space-x-4">
          <NuxtLink to="/signup" class="bg-white text-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Manage my account
          </NuxtLink>
          <NuxtLink to="/admin/statistics" class="bg-white text-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            View my statistics
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-slate-700 mb-11">Fast Links</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink
            to="/admin/user/create"
            class="p-6 bg-slate-100 rounded-lg shadow hover:cursor-pointer">
            <Icon icon="mdi:view-dashboard" class="text-4xl text-red-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Create a User</h3>
            <p class="text-slate-600">Create a user. Efficiently.</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/users"
            class="p-6 bg-slate-100 rounded-lg shadow">
            <Icon icon="mdi:calendar" class="text-4xl text-red-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">See Users</h3>
            <p class="text-slate-600">See the list of users and perform actions on them.</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/statistics"
            class="p-6 bg-slate-100 rounded-lg shadow">
            <Icon icon="mdi:account-group" class="text-4xl text-red-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">See statistics</h3>
            <p class="text-slate-600">See your statistics and epiTrello overall statistics</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-4 bg-white mb-10">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-slate-700 mb-11">Your Mission</h2>
        <p class="text-lg text-slate-600">
          Your mission is to keep order in epiTrello and make sure user requests are resolved.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
.scroll-box {
height: calc(100vh - 156px);
overflow-y: scroll;
}
</style>
