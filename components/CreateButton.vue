<template>
  <div>
    <button @click.stop="openCreateMenu" id="createButton" class="hover:!bg-[--hover-bg-color] font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]"
        :style="{ '--hover-bg-color': isLightColor(props.color) ? '#679bf0' : getEvenLighterColor(props.color), backgroundColor: isLightColor(props.color) ? '#3b82f6' : getLighterColor(props.color), color: isLightColor(props.color) ? 'white' : computeFromContrast(props.color) }">
      Create
    </button>
    <button @click.stop="openCreateMenu" id="createShortButton" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-[0.25rem] px-[0.25rem] rounded mt-[-0.1rem]">
      <Icon icon="mdi:plus" class="w-6 h-6 text-white" />
    </button>
    <div
      ref="createMenu"
      class="bg-slate-100 text-black rounded-lg shadow-lg w-[22rem] mt-[4px] absolute"
      v-if="showCreateMenu">
      <div class="flex flex-col text-start justify-between cursor-pointer hover:bg-slate-200 px-4">
        <div class="flex flex-row justify-start items-center"
          @click="redirectToCreate()">
          <Icon icon="mdi:trello" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-2 mb-2 text-start">Create board</h1>
        </div>
        <p class="text-sm text-slate-700 pb-3">A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
      </div>
      <div class="flex flex-col text-start justify-between cursor-pointer hover:bg-slate-200 px-4">
        <div class="flex flex-row justify-start items-center">
          <Icon icon="octicon:project-template-16" alt="" class="w-8 h-8 text-slate-700 p-2 rounded-md" />
          <h1 class="text-gray-600 font-mono font-medium text-sm ml-2 mt-3 mb-2 text-start">Start with a template</h1>
        </div>
        <p class="text-sm text-slate-700 pb-3">Get started faster with a board template.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'

const showCreateMenu = ref(false)
const createMenu = ref<HTMLElement | null>(null)

const router = useRouter()
const route = useRoute()

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

const titleColor = ref(isLightColor(props.color) ? '#3b82f6' : computeFromContrast(props.color))

watch(() => props.color, (newColor) => {
  console.log('Color changed to', newColor)
  titleColor.value = isLightColor(newColor) ? '#3b82f6' : computeFromContrast(newColor)
})

const redirectToCreate = () => {
  console.log('redirecting to create board')
  if (!route.params.userId || !route.params.workspaceId)
    throw new Error('userId and workspaceId are required to create a board')
  router.push(`/user/${route.params.userId}/workspace/${route.params.workspaceId}/board/create`)
}

const openCreateMenu = () => {
  showCreateMenu.value = !showCreateMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (showCreateMenu.value && createMenu.value && !createMenu.value.contains(event.target as Node)) {
    showCreateMenu.value = false
    console.log('clicked outside of Create menu')
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
@media (min-width: 1279px) {
  #createShortButton {
    display: none;
  }
}
@media (max-width: 1279px) {
  #createButton {
    display: none;
  }
}
</style>
