<template>
  <div>
    <!-- Trigger Button -->
    <div
      class="rounded-sm bg-transparent w-7 h-7 hover:bg-[--hover-bg-color] cursor-pointer"
      :style="{ '--hover-bg-color': isLightColor(props.color) ? '#e2e8f0' : getLighterColor(props.color) }"
      @click.stop="handleClick">
      <Icon icon="gg:menu-grid-o" class="w-full h-full p-1"
        :style="{ color: isLightColor(props.color) ? '#334155' : computeFromContrast(props.color) }" />
    </div>
    <!-- Menu Content -->
    <div
      ref="dropdownMenu"
      class="bg-slate-100 rounded-lg shadow-lg w-[16rem] mt-[9px] border border-gray-100 p-1.5 absolute left-2 pb-5 text-slate-700"
      v-if="showModal">
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-3 mt-2 mb-2 text-start">YOUR APPS</h1>
      <div class="flex flex-col text-start justify-between px-1">
        <NuxtLink to="/" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 h-12">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 bg-blue-700 text-white p-2 rounded-md ml-2" />
          <p class="ml-2 text-md font-sans text-gray-700">Trello</p>
        </NuxtLink>
      </div>
      <div class="flex flex-col text-start justify-between px-1 mb-1">
        <NuxtLink to="/admin" class="flex items-center focus:bg-gray-200 rounded-md transition duration-150 h-12">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 bg-red-500 text-white p-2 rounded-md ml-2" />
          <p class="ml-2 text-md font-sans text-gray-700">Trello Admin</p>
        </NuxtLink>
      </div>
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-3 mt-4 mb-2 text-start">DISCOVER MORE PRODUCTS</h1>
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

  console.log('Computing contrast for color', color)

  // Extract RGB values
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#1e293b' : '#ffffff'
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
