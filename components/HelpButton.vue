<template>
  <div>
    <Icon icon="material-symbols:help-outline" alt=""
      class="w-8 h-8 p-1.5 text-slate-700 rounded-[50%] hover:bg-slate-200 cursor-pointer mt-[-0.1rem]"
      @click.stop="openHelpMenu" />

    <div class="bg-white text-black rounded-lg shadow-lg w-[25rem] mt-[7px] border border-gray-100 p-3 absolute right-0"
      v-if="showHelpMenu" ref="helpMenu">
      <div
          v-for="(tip, i) in tips"
          :key="i">
        <div
          class="flex flex-col justify-start items-center hover:bg-slate-100 mx-2 h-[15rem] rounded-sm cursor-pointer"
          v-if="i === tipsIndex">
          <img :src="tip.img" alt="" class="w-full" />
          <div class="h-full flex flex-row justify-between items-center px-2">
            <h1 class="mt-1 font-medium">{{ tip.title }}</h1>
          </div>
        </div>
      </div>
      <div class="cursor-pointer py-2">
        <p
          @click.stop="changeTip"
          class="text-center hover:underline text-blue-700 px-2 cursor-pointer text-sm mb-2">
          Get a new tip.</p>
      </div>
      <hr />
      <div class="flex flex-col justify-center items-center py-5 gap-0.5">
        <div class="flex flex-row justify-center items-center">
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Pricing
          </button>
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Apps
          </button>
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Blog
          </button>
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Privacy
          </button>
        </div>
        <div class="flex flex-row justify-center items-center">
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Notice at Collection
          </button>
          <button
            @click.stop="showMoreOptions = true"
            v-if="!showMoreOptions"
            class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            More...
          </button>
          <button
            v-if="showMoreOptions"
            class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Help
          </button>
          <button
            v-if="showMoreOptions"
            class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Developers
          </button>
        </div>
        <div
          v-if="showMoreOptions"
          class="flex flex-row justify-center items-center">
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Legal
          </button>
          <button class="bg-white hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Attributions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showHelpMenu = ref(false)
const showMoreOptions = ref(false)
const helpMenu = ref<HTMLElement | null>(null)
const tips = [
  {
    img: "/guide.png",
    title: "New to Trello? Check out the guide",
  },
  {
    img: "/teamBuilding.png",
    title: "It's easy to get your team up and running with Trello playbooks",
  },
  {
    img: "/inspired.png",
    title: "Get inspired by dozens of different Trello workflows",
  },
  {
    img: "/powerups.png",
    title: "Make boards more powerful with Trello Power-Ups",
  }
]
const tipsIndex = ref(0)

const openHelpMenu = () => {
  showHelpMenu.value = !showHelpMenu.value
  showMoreOptions.value = false
}

const changeTip = () => {
  tipsIndex.value = tipsIndex.value === tips.length - 1 ? 0 : tipsIndex.value + 1
}

const handleClickOutside = (event: MouseEvent) => {
  if (showHelpMenu.value && helpMenu.value && !helpMenu.value.contains(event.target as Node)) {
    showHelpMenu.value = false
    console.log('clicked outside of Help menu')
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