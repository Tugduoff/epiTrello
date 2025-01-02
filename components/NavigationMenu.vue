<template>
  <div>
    <!-- Triggers -->
    <div class="flex-full-row gap-1 z-50">
      <!-- Workspaces Button -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer workspace-btn"
        @click.stop="toggleMenu(1)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">Workspaces</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- Recent Button -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer recent-btn"
        @click.stop="toggleMenu(2)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">Recent</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- Starred Button -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer starred-btn"
        @click.stop="toggleMenu(3)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">Starred</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- Templates Button -->
      <div
        class="flex-full-row hover:bg-slate-200 focus:bg-blue-100 p-1 px-3 hover:focus:bg-blue-200 gap-2 rounded-sm h-7 cursor-pointer template-btn"
        @click.stop="toggleMenu(4)">
        <p class="select-none text-slate-600 font-medium h-auto text-center justify-center">Templates</p>
        <Icon icon="bitcoin-icons:caret-down-outline" class="h-5 w-5 text-black" />
      </div>

      <!-- More Button (replaces Templates when width < 1280) -->
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
    <!-- Workspaces Menu -->
    <div
      ref="workspacesMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 p-1.5 absolute pb-2"
      v-if="openMenu == 1">
      <h1 class="text-gray-600 font-mono font-medium text-sm ml-3 mt-3 mb-2 text-start">Current Workspace</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <a href="#" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 p-2 gap-2">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <p class="text-sm font-sans text-slate-600 truncate">Workspace from Mitchel de la brouette de manass</p>
        </a>
      </div>
      <hr class="mt-4 mb-6">
      <h1 class="text-gray-600 font-mono font-medium text-sm ml-3 mt-3 mb-2 text-start">Your Workspaces</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <a href="#" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 p-2 gap-2">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <p class="text-sm font-sans text-slate-600 truncate">Workspace from Mitchel de la brouette de manass</p>
        </a>
      </div>
      <hr class="mt-4 mb-6">
      <h1 class="text-gray-600 font-mono font-medium text-sm ml-3 mt-3 mb-2 text-start">See my Workspaces</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <NuxtLink :to="redirectToWorkspaces()" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 p-2 gap-2">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <p class="text-sm font-sans text-slate-600 truncate">All my workspaces</p>
        </NuxtLink>
      </div>
    </div>
    <!-- Recent Menu -->
    <div
      ref="recentMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 p-1.5 absolute pb-2 ml-[9rem]"
      v-if="openMenu == 2">
      <div class="flex flex-col text-start justify-between px-1 hover:bg-slate-100 rounded-md">
        <a href="#" class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[87%]">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
            <Icon
              @click.stop="isStarred[0] = !isStarred[0]"
              :icon="isHovered[0] ? 'ph:star-bold' : 'ph:star-fill'"
              class="w-4 h-4 absolute ml-60 mb-3"
              :class="isStarred[0] ? 'text-yellow-300' : isHovered[0] ? 'text-slate-500' : 'text-white'"
              @mouseenter="isHovered[0] = true"
              @mouseleave="isHovered[0] = false"
            />
          </div>
        </a>
      </div>
      <div class="flex flex-col text-start justify-between px-1 hover:bg-slate-100 rounded-md">
        <a href="#" class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[87%]">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
            <Icon
              @click.stop="isStarred[1] = !isStarred[1]"
              :icon="isHovered[1] ? 'ph:star-bold' : 'ph:star-fill'"
              class="w-4 h-4 absolute ml-60 mb-3"
              :class="isStarred[1] ? 'text-yellow-300' : isHovered[1] ? 'text-slate-500' : 'text-white'"
              @mouseenter="isHovered[1] = true"
              @mouseleave="isHovered[1] = false"
            />          
          </div>
        </a>
      </div>
    </div>
    <div
      ref="starredMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 p-1.5 absolute pb-2 ml-[16rem]"
      v-if="openMenu == 3">
      <div class="flex flex-col text-start justify-between px-1 hover:bg-slate-100 rounded-md" v-if="isStarred[0]">
        <a href="#" class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[87%]">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
            <Icon
              @click.stop="isStarred[0] = !isStarred[0]; isHovered[0] = false"
              :icon="isHovered[0] ? 'ph:star-bold' : 'ph:star-fill'"
              class="w-4 h-4 absolute ml-60 mb-3"
              :class="isStarred[0] ? 'text-yellow-300' : isHovered[0] ? 'text-slate-500' : 'text-white'"
              @mouseenter="isHovered[0] = true"
              @mouseleave="isHovered[0] = false"
            />
          </div>
        </a>
      </div>
      <div class="flex flex-col text-start justify-between px-1 hover:bg-slate-100 rounded-md" v-else-if="isStarred[1]">
        <a href="#" class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[87%]">
          <img src="assets/img/trello.png" alt="" class="min-w-10 max-w-10 max-h-10 min-h-10 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
            <Icon
              @click.stop="isStarred[1] = !isStarred[1]; isHovered[1] = false"
              :icon="isHovered[1] ? 'ph:star-bold' : 'ph:star-fill'"
              class="w-4 h-4 absolute ml-60 mb-3"
              :class="isStarred[1] ? 'text-yellow-300' : isHovered[1] ? 'text-slate-500' : 'text-white'"
              @mouseenter="isHovered[1] = true"
              @mouseleave="isHovered[1] = false"
            />
          </div>
        </a>
      </div>
      <div class="flex flex-col text-start justify-between px-1.5 rounded-md" v-else>
        <img src="assets/img/starred.svg" alt="" class="pt-1" />
        <p class="text-sm font-sans text-slate-600 text-center pb-4 pt-6">Star important boards to access them quickly and easily.</p>
      </div>
    </div>
    <div
      ref="templatesMenu"
      class="bg-white text-black rounded-lg shadow-lg w-[22rem] mt-[9px] border border-gray-100 py-4 absolute pb-2 ml-[23rem]"
      v-if="openMenu == 4">
      <div
        class="overflow-scroll"
        :class="showTemplates ? 'h-[32.1rem]' : ''">
        <div class="flex flex-row justify-between pb-4 px-4">
          <p class="text-gray-600 font-mono font-medium text-sm text-start">Top templates</p>
          <button @click.stop="showTemplates = !showTemplates">
            <Icon
              icon="bitcoin-icons:caret-down-outline"
              class="hover:bg-gray-200 rounded-sm"
              :class="showTemplates ? 'rotate-180' : ''"
            />
          </button>
        </div>
        <div v-if="showTemplates" v-for="(topTemplate, i) in topTemplates" :key="i" class="px-4">
          <div class="flex flex-row gap-2 mt-1 items-center hover:bg-gray-100 p-1 rounded-lg cursor-pointer mr-4">
            <img :src="topTemplate.img" alt="" class="h-[32px] w-[40px] rounded-[4px]"/>
            <p class="text-slate-800">{{ topTemplate.title }}</p>
          </div>
        </div>
      </div>
      <div class="border-t-[1px] border-solid border-slate-200 p-3">
        <div class="flex flex-row justify-center items-center">
          <div class="mb-2">
            <Icon icon="fluent:border-none-16-filled" class="text-blue-700 min-h-6 max-h-6 min-w-6 max-w-6 ml-3" />
            <Icon icon="mdi:trello" class="text-blue-700 min-h-6 max-h-6 min-w-6 max-w-6 absolute mt-[-19px] ml-[17px] bg-white" />
          </div>
          <p class="text-start ml-4 text-gray-600 font-mono font-medium text-sm">See hundreds of templates from the Trello community</p>
        </div>
        <button class="mt-3 w-full py-2 bg-gray-100 text-gray-600 font-mono font-medium text-sm hover:bg-gray-200">
          Explore templates
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = ref<string>(route.params.userId as string)

// Manage open/close state for the menu items
const isStarred = ref([true, true])
const isHovered = ref([false, false])
const showTemplates = ref(true)
const openMenu = ref<number | null>(null)
const workspacesMenu = ref<HTMLElement | null>(null)
const recentMenu = ref<HTMLElement | null>(null)
const starredMenu = ref<HTMLElement | null>(null)
const templatesMenu = ref<HTMLElement | null>(null)
const topTemplates = ref([
  {
    title: 'Agile Board Template | Trello',
    img: '/background.jpg',
  },
  {
    title: 'Agile Board Template2 | Trello',
    img: '/guide.png',
  },
  {
    title: 'Agile Board Template3 | Trello',
    img: '/powerups.png',
  },
  {
    title: 'Agile Board Template4 | Trello',
    img: '/background.jpg',
  },
  {
    title: 'Agile Board Template5 | Trello',
    img: '/teamBuilding.png',
  },
  {
    title: 'Agile Board Template6 | Trello',
    img: 'powerups.png',
  },
  {
    title: 'Agile Board Template7 | Trello',
    img: '/guide.png',
  },
  {
    title: 'Agile Board Template8 | Trello',
    img: '/inspired.png',
  },
  {
    title: 'Agile Board Template9 | Trello',
    img: '/teamBuilding.png',
  },
  {
    title: 'Agile Board Template10 | Trello',
    img: '/background.jpg',
  },
  {
    title: 'Agile Board Template11 | Trello',
    img: '/guide.png',
  }
])

const toggleMenu = (menuNumber: number) => {
  openMenu.value = openMenu.value === menuNumber ? null : menuNumber
}

const handleClickOutside = (event: MouseEvent) => {
  if (openMenu.value == 1 && workspacesMenu.value && !workspacesMenu.value.contains(event.target as Node)) {
    openMenu.value = null
    console.log('clicked outside of Workspaces menu')
  }
  if (openMenu.value == 2 && recentMenu.value && !recentMenu.value.contains(event.target as Node)) {
    openMenu.value = null
    console.log('clicked outside of Recent menu')
  }
  if (openMenu.value == 3 && starredMenu.value && !starredMenu.value.contains(event.target as Node)) {
    openMenu.value = null
    console.log('clicked outside of Starred menu')
  }
  if (openMenu.value == 4 && templatesMenu.value && !templatesMenu.value.contains(event.target as Node)) {
    openMenu.value = null
    console.log('clicked outside of Templates menu')
  }
}

const redirectToWorkspaces = () => {
  return `/user/${userId.value}/workspaces`
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* For width < 1280 and >= 1160: Replace "Templates" with "More" */
@media (min-width: 1279px) {
  .more-btn {
    display: none;
  }
}

@media (max-width: 1279px) and (min-width: 1160px) {
  .template-btn {
    display: none;
  }
  .more-btn {
    display: flex;
  }
}

/* For width < 1160 and >= 1040: Hide "Starred" */
@media (max-width: 1159px) and (min-width: 1040px) {
  .starred-btn ,.template-btn {
    display: none;
  }
  .more-btn {
    display: flex;
  }
}

/* For width < 1040 and >= 900: Hide "Recent" */
@media (max-width: 1039px) and (min-width: 900px) {
  .recent-btn, .starred-btn, .template-btn {
    display: none;
  }
  .more-btn {
    display: flex;
  }
}

/* For width < 900: Hide "Workspaces" */
@media (max-width: 899px) {
  .workspace-btn, .recent-btn, .starred-btn, .template-btn {
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
