<template>
  <div class="z-[10000]">
    <img
      src="@/assets/img/sleepPanda.png"
      alt=""
      class="w-8 h-8 text-slate-700 rounded-[50%] hover:bg-slate-200 cursor-pointer mt-[-0.1rem]"
      @click.stop="openAccountMenu"/>
    <div class="bg-white text-black rounded-lg shadow-lg w-[20rem] mt-[7px] border border-gray-100 absolute right-0"
      v-if="showAccountMenu" ref="accountMenu">
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-5 mt-8 mb-2 text-start">ACCOUNT</h1>
      <div class="flex flex-row justify-start items-center px-5 pb-3">
        <img src="@/assets/img/background.jpg" alt="" class="w-10 h-10 rounded-[50%]" />
        <div class="flex flex-col text-start justify-between">
          <p class="ml-2 text-sm font-sans text-slate-600">Sleepy Panda</p>
          <p class="ml-2 text-sm font-sans text-slate-600">sleepypanda@gmail.com</p>
        </div>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Switch accounts</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6 flex flex-row justify-between">
        <h2 class="text-slate-800 text-sm">Manage account</h2>
        <Icon icon="ant-design:export-outlined" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
      </div>
      <hr class="mt-2 py-1" />
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-5 mt-5 mb-2 text-start">EPITRELLO</h1>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Profile and visibility</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Activity</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Cards</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Settings</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6 flex flex-row justify-between">
        <h2 class="text-slate-800 text-sm">Theme</h2>
        <Icon icon="gravity-ui:chevron-right" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
      </div>
      <hr class="mt-2 py-1" />
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6 flex flex-row justify-start gap-2">
        <Icon icon="fluent:people-16-regular" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
        <h2 class="text-slate-800 text-sm">Create Workspace</h2>
      </div>
      <hr class="mt-2 py-1" />
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Help</h2>
      </div>
      <div class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6">
        <h2 class="text-slate-800 text-sm">Shortcuts</h2>
      </div>
      <hr class="mt-2 py-1" />
      <div
        @click="router.push('/logout')"
        class="hover:bg-slate-100 cursor-pointer py-2 text-start px-6 mb-2">
        <h2 class="text-slate-800 text-sm">Log Out</h2>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showAccountMenu = ref(false)
const accountMenu = ref<HTMLElement | null>(null)

const openAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (showAccountMenu.value && accountMenu.value && !accountMenu.value.contains(event.target as Node)) {
    showAccountMenu.value = false
    console.log('clicked outside of Account menu')
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