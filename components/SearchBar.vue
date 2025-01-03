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
      class="w-5 h-5 absolute mt-1 z-20"
      :style="{ color: isLightColor(props.color) ? '#334155' : computeFromContrast(props.color) }"
      :class="searchBarOpen ? 'ml-[-49.75rem]' : 'ml-1'"
      />
    <input
      id="searchBar"
      @click.stop="openSearchBar"
      type="text"
      class="h-7 border border-slate-400 rounded-[0.25rem] p-2 focus:outline-none focus:border-blue-500 pl-7 text-sm placeholder:text-[--placeholder-color]"
        :style="{ '--hover-bg-color': isLightColor(props.color) ? '#f1f5f9' : getEvenLighterColor(props.color), backgroundColor: isLightColor(props.color) ? '#f1f5f9' : getLighterColor(props.color), color: computeFromContrast(props.color), '--placeholder-color': isLightColor(props.color) ? '#334155' : computeFromContrast(props.color) }"
      :placeholder="searchBarOpen ? 'Search Trello' : 'Search'"
      :value="search"
      :class="searchBarOpen ? 'w-[50rem] absolute z-10 ml-[-50rem]' : 'w-[13rem]'"
    />
    <div
      ref="searchBar"
      class="bg-slate-100 text-black rounded-lg shadow-lg ml-[-50rem] w-[50rem] mt-[37px] absolute"
      v-if="searchBarOpen">
      <div class="flex flex-col text-start justify-between">
        <div class="flex flex-row justify-start items-center">
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-2 mb-2 text-start pl-2">RECENT BOARDS</h1>
        </div>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[97.5%] hover:bg-slate-200 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[97.5%] hover:bg-slate-200 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
        <a href="#"
          class="flex items-center rounded-md transition duration-150 p-2 gap-2 w-[97.5%] hover:bg-slate-200 ml-2 cursor-pointer">
          <img src="assets/img/trello.png" alt="" class="min-w-8 max-w-8 max-h-8 min-h-8 bg-blue-700 text-white rounded-md border-none" />
          <div class="flex flex-col justify-center items-start w-[90%]">
            <p class="text-sm font-sans text-slate-600 truncate w-full">Agile Board Template | Trello</p>
            <p class="text-xs font-sans text-slate-400 truncate w-full">Workspace from Mitchel de la brouette de manass</p>
          </div>
        </a>
      </div>
      <div class="mt-2 flex flex-col text-start justify-between cursor-pointer hover:bg-slate-200 px-4 border-t-[1px] border-solid border-slate-200">
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row justify-start items-center">
            <Icon icon="ph:magnifying-glass-bold" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
            <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-3 mb-2 text-start">Advanced Search</h1>
          </div>
          <Icon icon="tabler:arrow-back" alt="" class="w-6 h-6 text-slate-500 bg-slate-200 p-1 rounded-[0.25rem]" />
        </div>
      </div>
      <div class="flex flex-col text-center justify-center cursor-pointer bg-slate-200 px-4 rounded-b-lg">
        <a href="#" class="hover:text-blue-700 text-slate-700 text-sm underline py-4">Help us improve your search results!</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const search = ref("")
const searchBarOpen = ref(false)
const searchBar = ref<HTMLElement | null>(null)

function isLightColor(color: string): boolean {
  // Remove the hash if present
  color = color.replace(/^#/, '');

  // Parse the color into its RGB components
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate the YIQ value (perceived brightness)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check if the color is light or white
  return yiq > 200; // Threshold for "light" can be adjusted
}

function computeFromContrast(color: string) {
  // Ensure the color starts with '#' and is in the correct format
  if (!/^#([0-9A-Fa-f]{6})$/.test(color)) {
    throw new Error('Invalid color format. Use #RRGGBB format.')
  }

  // console.log('Computing contrast for color', color)

  // Extract RGB values
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#1e293b' : '#ffffff'
}

function getEvenLighterColor(color: string, percent: number = 10): string {
  return getLighterColor(color, 15);
}

function getLighterColor(color: string, percent: number = 10): string {
  // Remove the hash if present
  color = color.replace(/^#/, '');

  // Parse the color into its RGB components
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  // Lighten each component
  r = Math.min(255, Math.round(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.round(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.round(b + (255 - b) * (percent / 100)));

  // Convert back to hexadecimal and return the color
  const lighterColor = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return lighterColor;
}

const props = defineProps<{
  color: string,
}>()

const titleColor = ref(isLightColor(props.color) ? '#f1f5f9' : computeFromContrast(props.color))

watch(() => props.color, (newColor) => {
  console.log('Color changed to', newColor)
  titleColor.value = isLightColor(newColor) ? '#f1f5f9' : computeFromContrast(newColor)
})

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