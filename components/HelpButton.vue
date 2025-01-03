<template>
  <div>
    <Icon icon="material-symbols:help-outline" alt=""
      class="w-8 h-8 p-1.5 rounded-[50%] cursor-pointer mt-[-0.1rem] hover:bg-[--hover-bg-color]"
      @click.stop="openHelpMenu"
      :style="{ color: titleColor, '--hover-bg-color': isLightColor(props.color) ? '#e2e8f0' : getLighterColor(props.color) }" />
    <div class="bg-slate-100 text-black rounded-lg shadow-lg w-[25rem] mt-[7px] border border-gray-100 p-3 absolute right-0"
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
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Pricing
          </button>
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Apps
          </button>
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Blog
          </button>
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Privacy
          </button>
        </div>
        <div class="flex flex-row justify-center items-center">
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Notice at Collection
          </button>
          <button
            @click.stop="showMoreOptions = true"
            v-if="!showMoreOptions"
            class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            More...
          </button>
          <button
            v-if="showMoreOptions"
            class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Help
          </button>
          <button
            v-if="showMoreOptions"
            class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Developers
          </button>
        </div>
        <div
          v-if="showMoreOptions"
          class="flex flex-row justify-center items-center">
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Legal
          </button>
          <button class="bg-slate-100 hover:bg-slate-200 text-sm text-slate-500 font-medium py-[0.25rem] px-[0.75rem] rounded mt-[-0.1rem]">
            Attributions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

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

const titleColor = ref(isLightColor(props.color) ? '#334155' : computeFromContrast(props.color))

watch(() => props.color, (newColor) => {
  console.log('Color changed to', newColor)
  titleColor.value = isLightColor(newColor) ? '#334155' : computeFromContrast(newColor)
})

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