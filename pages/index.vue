<template>
    <nav class="p-2 border-solid border-b-[1px] border-gray-200">
      <div class="flex justify-between text-center flex-row w-full">
        <div class="flex flex-row justify-start text-center gap-1">
          <div class="flex flex-row justify-start items-center">
            <DropdownHomeMenu class="h-7" color="#f1f5f9" />
            <TitleButton class="h-7" color="#f1f5f9"/>
          </div>
        </div>
        <div class="flex flex-row justify-end text-center gap-1.5">
          <SearchBar class="h-7" color="#f1f5f9"/>
          <HelpButton class="h-7" color="#f1f5f9"/>
        </div>
      </div>
    </nav>
    <div class="p-5 scroll-box overscroll-none">
      <section class="w-full pt-8 pb-12 bg-blue-600 text-white rounded-xl">
        <div class="max-w-6xl mx-auto text-center">
          <Icon icon="mdi:trello" class="text-6xl mx-auto text-white mb-4" />
          <h1 class="text-4xl font-bold mb-4">Welcome to epiTrello</h1>
          <p class="text-lg font-medium">
            Organize your tasks and projects with ease, all in one place. Get started now and stay on track.
          </p>
          <div class="mt-6 space-x-4">
            <NuxtLink to="/signup" class="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
              Sign up for Free
            </NuxtLink>
            <NuxtLink to="/login" class="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition">
              Log in now
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-slate-700 mb-11">Key Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 bg-slate-100 rounded-lg shadow">
              <Icon icon="mdi:view-dashboard" class="text-4xl text-blue-600 mb-4" />
              <h3 class="text-xl font-semibold mb-2">Intuitive Dashboard</h3>
              <p class="text-slate-600">A streamlined interface to manage all your projects effortlessly.</p>
            </div>
            <div class="p-6 bg-slate-100 rounded-lg shadow">
              <Icon icon="mdi:calendar" class="text-4xl text-blue-600 mb-4" />
              <h3 class="text-xl font-semibold mb-2">Project Scheduling</h3>
              <p class="text-slate-600">Easily manage deadlines and stay on top of your tasks.</p>
            </div>
            <div class="p-6 bg-slate-100 rounded-lg shadow">
              <Icon icon="mdi:account-group" class="text-4xl text-blue-600 mb-4" />
              <h3 class="text-xl font-semibold mb-2">Collaborate with Team</h3>
              <p class="text-slate-600">Work together with your team on projects with real-time updates.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-4 bg-white mb-10">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-slate-700 mb-11">Our Mission</h2>
          <p class="text-lg text-slate-600">
            Our mission is to help you stay organized and productive. We believe that by providing a simple and intuitive platform, you can focus on what matters most.
          </p>
        </div>
      </section>
    </div>
    <section class="py-8 bg-blue-50 bottom-0 absolute w-full">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Ready to Get Started?</h2>
        <NuxtLink to="/signup" class="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Create Your Account
        </NuxtLink>
      </div>
    </section>
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
