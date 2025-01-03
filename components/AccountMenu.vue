<template>
  <div class="z-[10000]">
    <img
      src="@/assets/img/sleepPanda.png"
      alt=""
      class="w-8 h-8 rounded-[50%] cursor-pointer mt-[-0.1rem] hover:bg-[--hover-bg-color]"
      @click.stop="openAccountMenu"
      :style="{ color: titleColor, '--hover-bg-color': isLightColor(props.color) ? '#e2e8f0' : getLighterColor(props.color) }" />
    <div class="bg-slate-100 text-black rounded-lg shadow-lg w-[20rem] mt-[7px] border border-gray-100 absolute right-2"
      v-if="showAccountMenu" ref="accountMenu">
      <h1 class="text-gray-600 font-mono font-bold text-sm ml-5 mt-8 mb-2 text-start">ACCOUNT</h1>
      <div class="flex flex-row justify-start items-center px-5 pb-3">
        <img src="@/assets/img/sleepPanda.png" alt="" class="w-10 h-10 rounded-[50%]" />
        <div class="flex flex-col text-start justify-between">
          <p class="ml-2 text-sm font-sans text-slate-600" v-if="user && user.name">{{ user.name }}</p>
          <p class="ml-2 text-sm font-sans text-slate-600" v-else>Sleepy Panda</p>
          <p class="ml-2 text-xs font-sans text-slate-600" v-if="user && user.email">{{ user.email }}</p>
          <p class="ml-2 text-xs font-sans text-slate-600" v-else>sleepypanda@gmail.com</p>
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
        <Icon icon="mdi:account-multiple" alt="" class="w-6 h-6 text-slate-600 p-1 rounded-[0.25rem] hover:bg-slate-200 cursor-pointer" />
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const router = useRouter()
const userEmail = Cookies.get('user')
const user = ref<{
  name?: string,
  email?: string
}>({})

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

watch(() => userEmail, async () => {
  await fetchRealUser()
})

async function fetchRealUser() {
  try {
    const res = await axios.get(`/api/user/mail?email=${userEmail}`)

    if (res.data.status === 200) {
      user.value = res.data.user
    } else {
      console.error('Failed to fetch user', res)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  await fetchRealUser()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>

</style>